/**
 * 过滤链上某个合约的某个event事件: await contract.queryFilter('事件名', 起始区块, 结束区块)
 * ethers官网API：https://docs.ethers.org/v6/api/contract/#BaseContract
 */

const ethers = require('ethers');

const ALCHEMY_SEPOLIA_KEY = '2vswxxxxnL4f88kg5qZ';
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_KEY}`);

//只需要填入我们关心的event即可
const abiERC20 = [
    "event Transfer(address indexed from, address indexed to, uint256 tokens)"
];

const addressERC20 = '0x2d0339D0244A0085C1d7398c16449a2d39c97E38';
//获取合约实例
const contractERC20 = new ethers.Contract(addressERC20, abiERC20, provider);

const main = async () => {

//得到当前区块
const block = await provider.getBlockNumber();
console.log(`当前区块高度${block}`);
const transferEvents = await contractERC20.queryFilter('Transfer', block - 10000, block);
if (transferEvents.length <= 0) {
    console.log("最近10000个区块没有找到transfer事件");
    return;
}
console.log(transferEvents[0]);

console.log(`\n解析事件`);

//请注意：这里取值的key一定要跟abi的参数名保持一致
const amount = ethers.formatUnits(ethers.getBigInt(transferEvents[0].args["tokens"]), "ether");
console.log(`地址${transferEvents[0].args["from"]} 转账 ${amount} WETH到地址 ${transferEvents[0].args["to"]}`);
}
main()
