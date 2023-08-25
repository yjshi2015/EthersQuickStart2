/**
 * 多个钱包的ETH、token代币归集到1个钱包
 * 
 * todo syj
 * 1.把自己的多个钱包归集到一起
 * 2.熟悉官网API
 */

const ethers = require('ethers');
const keyConfig = require('./ignore_keyConfig.json');

console.log("1.创建provider和wallet, 其中wallet是接收资产的钱包");
const provider = new ethers.JsonRpcProvider(keyConfig.RPCProvider['sepolica.testnet']);
//用privatekey和provider创建wallet钱包，当然钱包要有代币和ETH
const privateKey = keyConfig.syj.privateKey;
const wallet = new ethers.Wallet(privateKey, provider);

console.log("\n2.创建sub钱包");
let wallets = [];
let subPrivateKey1 = keyConfig.sdz.privateKey;
let subWallet1 = new ethers.Wallet(subPrivateKey1, provider);
let subPrivateKey2 = keyConfig.rzm.privateKey;
let subWallet2 = new ethers.Wallet(subPrivateKey2, provider);
wallets.push(subWallet1);
wallets.push(subWallet2);
console.log(wallets);

//定义发送金额 1 ethers
const amount = ethers.parseEther("0.05");

const main = async () => {
    console.log("\n3.读取1个地址的ETH和WETH余额");
    const balanceETH = await provider.getBalance(wallets[0]);
    console.log(`钱包: ${wallets[0].address}的ETH余额为 ${ethers.formatEther(balanceETH)}`);

    console.log("\n4.批量归集钱包数组的ETH");
    const txSendETH = {
        to: wallet.address,
        value: amount
    };
    for (let i = 0; i < wallets.length; i++) {
        var tx = await wallets[i].sendTransaction(txSendETH);
        console.log(`第${i+1} 个钱包 ${wallets[i].address} ETH归集开始`);
    }
    await tx.wait();
    console.log("ETH 归集结束");

    console.log("\n5.验证归集后的ETH和代币WETH余额");
    const balanceETHAfter = await provider.getBalance(wallets[0]);
    console.log(`第1个钱包${wallets[0].address}的 ETH 余额为${ethers.formatEther(balanceETHAfter)}`);
}
main()