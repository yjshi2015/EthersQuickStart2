/**
 * wallet的生成及转账
 * todo syj 查看ethers->wallet的API
 */
const ethers = require('ethers');

const ALCHEMY_KEY = '2vsw2JgOxxxxxxxxxx4f88kg5qZ';
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`);



//二、利用私钥和provider创建wallet
const privateKey = '5f5e109d57xxxxxxxxxxx8a956af7d877dff0';
const wallet = new ethers.Wallet(privateKey, provider);
const mnemonic = wallet.mnemonic;
console.log(wallet.privateKey);
console.log(wallet.address);

//无法根据钱包生成其助记词和密码
console.log(mnemonic.password)
console.log(mnemonic.wordlist)
console.log(wallet)


