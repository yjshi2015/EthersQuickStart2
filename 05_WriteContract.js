/**
 * 对合约进行写操作
 * 查看ethers官网对应的API
 * 
 * todo syj
 * 中午咨询下如何在goerlia网上领取测试币？？？
 * 曲线救国的方式：把goerlia的合约部署到sepolia测试网上
 * 
 * Note: 
 * abi一定不要手写，因为不会提示语法错误，public写成了pubic，导致运行失败
 */
const ethers = require('ethers');

//一、生成provider
const ALCHEMY_GOERLI_KEY = 'dTKTdrxxxxnAu7foA';
const provider = new ethers.JsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_GOERLI_KEY}`);

//二、生成wallet
const privateKey = 'xxxxxxxxxxxxxxxxxxxxxxx';
const wallet = new ethers.Wallet(privateKey, provider);

//三、生成合约
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
    "function transfer(address, uint) public returns (bool)",
    "function withdraw(uint) public",
];

const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'; //goerli测试网地址
//声明可写合约
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);
//或者先声明只读合约，再用connnect(wallet)函数转成可写合约
// const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider);
// contractWETH.connect(wallet);

const main = async () => {
    console.log(`begin-------------------`);

    //调用只读函数
    const address = await wallet.getAddress();
    const balanceWETH = await contractWETH.balanceOf(address);
    console.log(`1.钱包账户 ${address} 当前的WETH余额为${ethers.formatEther(balanceWETH)}`);

    //查询的是钱包主账户的余额
    const balanceETH = await provider.getBalance(wallet);
    console.log(`2.钱包 ${wallet} 当前的ETH余额为${ethers.formatEther(balanceETH)}`);

/**
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