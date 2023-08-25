/**
 * 使用ethers生成靓号
 * 
 * 助记词的顺序跟私钥有密切关系，切记不要搞乱顺序
 */

const {ethers} = require('ethers');

var wallet;
// const regex = /^0x00.*b$/
const regex = /^0x00.*$/
var isValid = false;
while(!isValid) {
    wallet = ethers.Wallet.createRandom();
    isValid = regex.test(wallet.address);
}
console.log(`靓号: ${wallet.address}`)
console.log(`私钥: ${wallet.privateKey}`)
console.log(`助记词: ${wallet.mnemonic.phrase}`)

/**
 * 靓号: 0x000e2392dfb16454290f0e391E7558D9B3839a74
 * 私钥: 0x93c67ad806919d824bc222637a0138dd6abfccd9cdb7c11f1a4b16c5a1b1e429
 */
const mnemonic2 = 'canal boil buffalo deer lottery tiger blue fresh dress lumber actual hawk';
const wallet2 = ethers.Wallet.fromPhrase(mnemonic2);
console.log(`wallet2钱包地址: ${wallet2.address}`)
console.log(`wallet2钱包私钥: ${wallet2.privateKey}`)

//调整助记词顺序后，无法恢复钱包
const mnemonic3 = 'boil canal buffalo deer lottery tiger blue fresh dress lumber actual hawk';
const wallet3 = ethers.Wallet.fromPhrase(mnemonic3);
console.log(`wallet3钱包地址: ${wallet3.address}`)
console.log(`wallet3钱包私钥: ${wallet3.privateKey}`)
