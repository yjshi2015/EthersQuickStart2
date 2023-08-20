/**
 * 操作链上的合约
 * const readOnlyConstract = new ethers.Contract(`address`, `abi`, `provider`);
 * const writeConstract = new ethers.Contract(`address`, `abi`, `signer`);
 * 
 */

const ethers = require('ethers');
const ALCHEMY_KEY = 'y0RKCxxxxx_BbEQOZcqH';
const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`);

//自定义的合约
const ALCHEMY_SEPOLIA_KEY = '2vsw2JgOi6Hq-6Ky9RvvKnL4f88kg5qZ';
const providerAlchemySepolia = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_KEY}`);
const myabi = '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
const myAddress = '0x1a403253f9cE59E918a6C66a94bEFe2D35299600';
const myContract = new ethers.Contract(myAddress, myabi, providerAlchemySepolia);


 //从Remix 或者 VS code的编译后文件 或 以太坊浏览器的合约页面中copy
 const abiWETH = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]';
 const addressWETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
 const constractWETH = new ethers.Contract(addressWETH, abiWETH, provider);


 //手写abi
 const abiDAI = [
     "function name() view returns (string)",
     "function symbol() view returns (string)",
     "function totalSupply() view returns (uint256)",
     "function balanceOf(address) view returns (uint256)"
 ];
 const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
 const constractDAI = new ethers.Contract(addressDAI, abiDAI, provider);

const main = async () => {
/**
    //1.读取WETH合约的链上信息
   const nameWETH = await constractWETH.name();
   const symbol = await constractWETH.symbol();
   const totalSupply = await constractWETH.totalSupply();
   console.log("\n1.读取WETH合约信息");
   console.log(`合约地址：${addressWETH}`);
   console.log(`name: ${nameWETH}`);
   console.log(`symbol: ${symbol}`);
   console.log(`totalSupply: ${totalSupply}`);
   const balanceWETH = await constractWETH.balanceOf(`vitalik.eth`);
   console.log(`vitalik 持仓：${ethers.formatEther(balanceWETH)}\n`);

   //2.读取DAI链上信息
   const nameDAI = await constractDAI.name();
   const symbolDAI = await constractDAI.symbol();
   const totalSupplyDAI = await constractDAI.totalSupply();
   console.log("\n2.读取DAI合约信息");
   console.log(`合约地址：${addressDAI}`);
   console.log(`name: ${nameDAI}`);
   console.log(`symbol: ${symbolDAI}`);
   console.log(`totalSupply: ${totalSupplyDAI}`);
   const balanceDAI = await constractDAI.balanceOf(`vitalik.eth`);
   console.log(`vitalik 持仓：${ethers.formatEther(balanceDAI)}\n`);
*/

   //读取测试网络sepolia中自己发布的合约的retrieve函数
   const num = await myContract.retrieve();
   console.log(`myContract num value : %d`, num);
}

main();

