// import {ethers} from "ethers";

const ethers = require('ethers');
//ethers中默认的provider提供了对区块链及状态的只读访问，写的操作要用signature
//provider内置的rpc访问速度有限制，仅供测试，生产环境还是要申请个人rpc，比如alchemy平台
// const provider = new ethers.getDefaultProvider();

const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/y0RKxxxxxxxxxxxxxxxxxxbEQOZcqH';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

const main = async () => {
    //查询vitalik的ETH余额
    //ethers原生支持ENS域名，所以不需要知道具体的address
    const balance = await provider.getBalance(`vitalik.eth`);
    console.log(`ETH Balance of Vitalik : ${ethers.formatEther(balance)} ETH`)
}

main()


//在控制台执行 `node .\01_HelloVitalik.js` 即可运行该JS文件