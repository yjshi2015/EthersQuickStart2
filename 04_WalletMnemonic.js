/**
 * wallet的生成及转账
 * todo syj 查看ethers->wallet的API
 */
const ethers = require('ethers');

const ALCHEMY_KEY = '2vsw2Jxxxxxxxxxxxxxxxxxxxxxxkg5qZ';
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`);



//二、利用私钥和provider创建wallet
const privateKey = 'xxxxxxxxxxxxxxxxxxxxxxx';
const wallet = new ethers.Wallet(privateKey, provider);
console.log(wallet)
// const mnemonic = wallet.mnemonic;
// console.log(wallet.privateKey);
// console.log(wallet.address);

// //无法根据钱包生成其助记词和密码
// console.log(mnemonic.phrase)
// console.log(mnemonic.password)
// console.log(mnemonic.wordlist)
// console.log(wallet)


