/**
 * 对合约进行写操作
 * 查看ethers官网对应的API
 */
const ethers = require('ethers');

//一、生成provider
const ALCHEMY_KEY = 'dTKTdrFoicAZBCIROLne9B8ranAu7foA';
const provider = new ethers.JsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}`);

//二、生成wallet
const privateKey = '5f5e109d57e793f4886f4b406b0e013e92c76b0273d3278e8a956af7d877dff0';
const wallet = new ethers.Wallet(privateKey, provider);

//三、生成合约
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
    "function transfer(address, uint) public returns (bool)",
    "function withdraw(uint) pubic",
];

const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'; //goerli测试网地址
//声明可写合约
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);
//或者先声明只读合约，再用connnect(wallet)函数转成可写合约
// const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider);
// contractWETH.connect(wallet);

const main = async () => {
    console.log(`begin-------------------`);
/**
    //调用只读函数
    const address = await wallet.getAddress();
    const balance = await contractWETH.balanceOf(address);
    console.log(`1.钱包账户 ${address} 当前的余额为${ethers.formatEther(balance)}`);

    //调用写函数deposit，写入0.001 ETH
    const tx = await contractWETH.deposit({value : ethers.parseEther("0.001")});
    await tx.wait();//等待交易上链
    console.log(tx);
    const balance_deposit = await contractWETH.balanceOf(address);
    console.log(`2.钱包账户 ${address} 当前的余额为${ethers.formatEther(balance_deposit)}`);

    //调用函数transfer，给vitalik转0.001ETH
    const tx2 = await contractWETH.transfer("vitalik.eth", ethers.parseEther("0.001"));
    await tx2.wait();
    const balance_transder = await contractWETH.balanceOf(address);
    console.log(`3.转账后WETH持仓${ethers.formatEther(balance_transder)}`);
 */
}
main()