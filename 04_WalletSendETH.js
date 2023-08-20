/**
 * wallet的生成及转账
 * todo syj 查看ethers->wallet的API
 */
const ethers = require('ethers');

const ALCHEMY_KEY = '2vsw2JgOxxxxxnL4f88kg5qZ';
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`);

//一、创建随机私钥的wallet对象
const wallet1 = ethers.Wallet.createRandom();
//通过connect(provider)连接到以太坊节点
const wallet1WithProvider = wallet1.connect(provider);
//获取助记词
const mnemonic = wallet1.mnemonic;

//二、利用私钥和provider创建wallet
const privateKey = '5f5e109d57e793f4886f4b406b0e013e92c76b0273d3278e8a956af7d877dff0';
const wallet2 = new ethers.Wallet(privateKey, provider);

//三、利用助记词创建wallet对象,使用wallet1的助记词，因此创建的钱包公私钥和wallet1相同
const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase);


const main = async() => {
    const address1 = await wallet1.getAddress();
    const address2 = await wallet2.getAddress();
    const address3 = await wallet3.getAddress();
    console.log(`1.获取钱包地址`);
    console.log(`钱包1地址: ${address1}`);
    console.log(`钱包2地址: ${address2}`);
    console.log(`钱包3地址: ${address3}`);
    console.log(`钱包1的助记词: ${wallet1.mnemonic.phrase}`);
    //利用wallet获取私钥
    console.log(`钱包2私钥: ${wallet2.privateKey}`);


    const txCount1 = await provider.getTransactionCount(wallet1WithProvider);
    const txCount2 = await provider.getTransactionCount(wallet2);
    console.log(`钱包1发送交易次数: ${txCount1}`);
    console.log(`钱包2发送交易次数: ${txCount2}`);

    //wallet2向wallet1转账0.001ETH
    console.log(`发送ETH(测试网)`);
    console.log(`发送前余额`);
    console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`);
    console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`);
    //构造请求
    const tx = {
        to : address1,
        value : ethers.parseEther("0.001")
    }
    const receipt = await wallet2.sendTransaction(tx);
    //等待链上确认交易
    await receipt.wait();
    //打印交易详情
    console.log(receipt);
    console.log(`发送后余额`);
    console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`);
    console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`);
}

main()