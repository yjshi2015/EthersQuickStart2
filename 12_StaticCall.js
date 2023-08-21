/**
 * 以太坊节点有个eth_call方法，让用户可以模拟一笔交易，并返回可能的交易结果，
 * 但不真正在区块链上执行它。
 * 
 * ethers中可以利用contract对象的staticCall来调用以太坊节点的eth_call方法，如果调用成功，则
 * 返回true，如果失败，则报错病返回失败原因。
 * 
 * const tx = await myContract.函数名.staticCall(参数,{override})
 * {override}：可包含以下参数
 * * from: 执行时的msg.sender，也就是你可以模拟任何一个人的调用
 * * value:执行时的msg.value
 * * blockTag: 执行时的区块高度
 * * gasprice
 * * gasLimit
 * * nonce
 *  
 * todo syj
 * 1.static call是什么意思？
 * 2.如何计算土狗币交易滑点
 * 3.delete private key(done)
 */

const ethers = require('ethers');

const ALCHEMY_SEPOLIA_KEY = 'y0RKCzMExxxxxxEQOZcqH';
const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_KEY}`);

//生成钱包
const privateKey = '5f5e109d57e7xxxxxxxxxxxxxxxxd3278e8a956af7d877dff0';
const wallet = new ethers.Wallet(privateKey, provider);
const myAddress = wallet.address;
// const vitalikAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
const vitalikAddress = '0x28C6c06298d514Db089934071355E5743bf21d60';

//获取DAI合约实例
const abiDAI = [
    "function balanceOf(address) public view returns(uint)",
    "function transfer(address, uint) public returns(bool)",
];
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const contractDAI = new ethers.Contract(addressDAI, abiDAI, provider);

const main = async () => {
    try {
        const myBalanceDAI = await contractDAI.balanceOf(myAddress);
        const vitalikBalanceDAI = await contractDAI.balanceOf(vitalikAddress);
        console.log(`我的钱包${myAddress} 的持仓是: ${ethers.formatEther(myBalanceDAI)}`);
        console.log(`V神的钱包${vitalikAddress} 的持仓是: ${ethers.formatEther(vitalikBalanceDAI)}`);

        //模拟V神向我转账1 DAI
        const tx = await contractDAI.transfer.staticCall(myAddress, ethers.parseEther("1"), {from: vitalikAddress});
        console.log(`交易会成功吗？: `, tx);

        //我向V神转账
        const tx2 = await contractDAI.transfer.staticCall("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", ethers.parseEther("1"), {from: myAddress});
        console.log(`交易会成功吗？: `, tx2);
    } catch (e) {
        console.log(e);
    }
}

main()