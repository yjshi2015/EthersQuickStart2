/**
 * 监听event事件
 * contract.once("eventName", callback):监听一次
 * contract.on("eventName", callback):持续监听
 * 
 * todo
 * 1、ethers官方文档地址：https://docs.ethers.org/v6/api/contract/#BaseContract
 * 2、DELETE 主网KEY
 */

const ethers = require("ethers");
const keyCongfig = require("./keyConfig_info.json");

const ALCHEMY_SEPOLIA_KEY = keyCongfig.RPCProvider["eth.mainnet"];
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_KEY);

const abiUSDT = [
    "event Transfer(address indexed from, address indexed to, uint value)"
];
const addressUSDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
//生成合约对象
const contractUSDT = new ethers.Contract(addressUSDT, abiUSDT, provider);

const main = async () => {
    console.log('\n1.利用contract.once(),监听一次Transfer事件');
    contractUSDT.once('Transfer', (from, to, value) => {
        console.log(`${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`);
    });    
    
    console.log('\n2.利用contract.on(),持续监听Transfer事件');
    contractUSDT.on('Transfer', (from, to, value) => {
        console.log(`${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`);
    });

    contractUSDT.on('Transfer', (res) => {
        console.log("---------------只打印了第一个参数");
        console.log(res);
    });
}

main()