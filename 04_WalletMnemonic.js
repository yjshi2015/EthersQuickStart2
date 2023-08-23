/**
 * wallet的生成及转账
 * todo syj 查看ethers->wallet的API
 */
const ethers = require('ethers');

const ALCHEMY_KEY = '2vsw2JgOi6Hq-6Ky9RvvKnL4f88kg5qZ';
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`);



//二、利用私钥和provider创建wallet
const privateKey = '5f5e109d57e793f4886f4b406b0e013e92c76b0273d3278e8a956af7d877dff0';
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


