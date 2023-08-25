/**
 * MEV（Maximal Extractable Value，最大可提取价值）:它是科学家的盛宴，矿场的友人，散户的噩梦
 * 
 * todo syj
 * 1.研究下swamp内容， WTF-solidity章节（amount0 * amount1 = 定值，注入流动性会获取收益）
 * 2.一笔滑点设置过高的swap交易可能会被三明治攻击：通过调整gas，机器人会在这笔交易之前插一个买单，之后发送一个卖单，等效于把把代币以高价卖给用户（抢跑）。
 * 3.节流函数throttle的节流机制原理(这个函数搞不明白……)
 * 5.ethers官网InterfaceI接口
 */

const {ethers} = require('ethers');
const configJson = require('./ignore_keyConfig.json');

const provider = new ethers.WebSocketProvider(configJson.RPCProvider['eth.mainnet.wss']);
let network = provider.getNetwork();
network.then(res => console.log(`[${(new Date).toLocaleTimeString()}] 连接到chain ID ${res.chainId}`));

//创建interface对象，用于解码交易
const iface = new ethers.Interface([
    "function transfer(address,uint256) public returns (bool)",
])

function throttle(fn, delay) {
    let timer;
    return function() {
        if(!timer) {
            fn.apply(this, arguments);
            timer = setTimeout(()=>{
                clearTimeout(timer);
                timer=null;
            }, delay);
        }
    }
}

const main = async () => {
    let i = 0;
    console.log("\n2.监听pending交易，打印txHash")
    provider.on("pending", async (txHash) => {
        if(txHash && i < 100) {
            //打印txHash
            console.log(`[${(new Date).toLocaleTimeString}] 监听Pending交易${i}: ${txHash}`);
            i++;
        }
    });

    console.log("\n3.监听pending交易，获取交易详情");
    provider.on("pending", throttle(async (txHash) => {
        if(txHash) {
            let tx = await provider.getTransaction(txHash);
            if(tx) {
                if(tx.data.indexOf(iface.getFunction("transfer").selector) !== -1) {
                    console.log(`\n[${(new Date).toLocaleTimeString()}] 监听pending交易: ${txHash}`);
                    console.log("pending交易详情原始数据");
                    console.log(tx);
                    //打印解码的交易详情
                    let parseTx = iface.parseTransaction(tx);
                    console.log("pending交易详情解码");
                    console.log(parseTx);
                    console.log("Input Data解码");
                    console.log(parseTx.args);
                }
            }
  
        }
    }, 1000));
}

main()