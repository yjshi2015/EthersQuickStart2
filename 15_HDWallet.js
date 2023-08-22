/**
 * 熟悉钱包的几个API
 * 1.通过助记词生成钱包
 * 2.通过path路径生成钱包
 * 3.钱包加解密
 */

const ethers = require('ethers');

console.log("1.创建HD钱包");
//生成随机助记词
const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(32));
console.log(`助记词如下: ${mnemonic}`);
//根据助记词创建HD钱包
const HDNodeWallet = ethers.HDNodeWallet.fromPhrase(mnemonic);
//这种方式并不能打印出对象信息，而是[object Object]
// console.log(`钱包信息如下: ${HDNodeWallet}`);
console.log(HDNodeWallet);

const numWallet = 20;
let basePath = "m/44'/60'/0'/0";
let wallets = [];
for (let i = 0; i < numWallet; i++) {
    let hdNodeNew = HDNodeWallet.derivePath(basePath + "/" + i);
    let walletNew = new ethers.Wallet(hdNodeNew.privateKey);
    console.log(`第${i+1}个钱包地址：${walletNew.address}`);
    wallets.push(walletNew);
}

const main = async () => {
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    console.log("\n钱包明文信息如下:");
    console.log(wallet);
    //加密钱包的信息
    const pwd = "syj2015";
    const json = await wallet.encrypt(pwd);    
    console.log("钱包密文信息如下:");
    console.log(json);

    const wallet2 = await ethers.Wallet.fromEncryptedJson(json, pwd);
    console.log("\n解密钱包数据")
    console.log(wallet2)
}
main()