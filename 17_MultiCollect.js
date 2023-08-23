/**
 * 多个钱包的ETH、token代币归集到1个钱包
 * 
 * todo syj
 * 1.把自己的多个钱包归集到一起
 * 2.熟悉官网API
 */

const ethers = require('ethers');

console.log("1.创建provider和wallet, 其中wallet是接收资产的钱包");
const ALCHEMY_SEPOLIA_KEY = '2vsw2JgOi6Hq-6Ky9RvvKnL4f88kg5qZ';
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_KEY}`);
//用privatekey和provider创建wallet钱包，当然钱包要有代币和ETH
const privateKey = '5f5e109d57e793f4886f4b406b0e013e92c76b0273d3278e8a956af7d877dff0';
const wallet = new ethers.Wallet(privateKey, provider);

console.log("\n2.声明WETH代币合约");
const abiWETH = [
    "function balanceOf(address) public view returns(uint256)",
    "function transfer(address, uint256) public returns(bool)",
];
//WETH合约sepolia testnet地址
const addressWETH = '0xC8ea610bA627aa39deA5C9F8064Efadf61A287E0';
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);

console.log("\n3.创建HD钱包");
//通通过助记词生成HD钱包
const mnemonic = "phrase sword gauge reveal capable subject album noise clever purse side major";
const hdNodeWallet = ethers.HDNodeWallet.fromPhrase(mnemonic);
console.log(hdNodeWallet);
//通通过HD钱包衍生20个钱包
const numWallet = 5;
let basePath = "m/44'/60'/0'/0";
let wallets = [];
for(let i = 0; i < numWallet; i++) {
    let hdNodeNew = hdNodeWallet.derivePath(basePath + "/" + i);
    let walletNew = new ethers.Wallet(hdNodeNew.privateKey);
    wallets.push(walletNew);
    console.log(walletNew.address);
}
//定义发送金额 1wei
const amount = ethers.parseEther("0.0003");

const main = async () => {
    console.log("\n4.读取1个地址的ETH和WETH余额");
    const balanceWETH = await contractWETH.balanceOf(wallets[0]);
    console.log(`钱包: ${wallets[0].address}的代币WETH的余额为 ${ethers.formatEther(balanceWETH)}`);
    const balanceETH = await provider.getBalance(wallets[0]);
    console.log(`钱包: ${wallets[0].address}的ETH余额为 ${ethers.formatEther(balanceETH)}`);


    console.log("\n5.批量归集5个钱包的ETH");
    const txSendETH = {
        to: wallet.address,
        value: amount
    };
    for (let i = 0; i < numWallet; i++) {
        //将钱包连接到provider
        let walletWithProvider = wallets[i].connect(provider);
        var tx = await walletWithProvider.sendTransaction(txSendETH);
        console.log(`第${i+1} 个钱包 ${walletWithProvider.address} ETH归集开始`);
    }
    await tx.wait();
    console.log("ETH 归集结束");

    console.log("\n6.将WETH合约连接到新的钱包,然后调用transfer方法归集每个钱包的WETH");
    for (let i = 0; i < numWallet; i++) {
        //将钱包连接到provider
        let walletWithProvider = wallets[i].connect(provider);
        //将合约连接到新的钱包
        //钱包就可以跟合约进行交互
        let contractConnected = contractWETH.connect(walletWithProvider);
        var tx = await contractConnected.transfer(wallet.address, amount);
        console.log(`第${i+1}个钱包 ${wallets[i].address} WETH归集开始`)
    }
    await tx.wait()
    console.log(`WETH 归集结束`)

    console.log("\n7.验证归集后的ETH和代币WETH余额");
    const balanceWETHAfter = await contractWETH.balanceOf(wallets[0]);
    console.log(`第1个钱包${wallets[0].address}的 WETH 余额为${ethers.formatEther(balanceWETHAfter)}`);
    const balanceETHAfter = await provider.getBalance(wallets[0]);
    console.log(`第1个钱包${wallets[0].address}的 ETH 余额为${ethers.formatEther(balanceETHAfter)}`);
    
}
main()