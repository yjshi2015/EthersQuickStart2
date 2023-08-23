/**
 * 批量转账功能
 * 1、批量生成20个钱包
 * 2、分别给20个钱包空投代币
 * 3、分别给20个钱包转0.001个以太币
 * 
 * Note:批量转账是否先验证收款地址为普通账户？？？而非合约地址，避免hack
 * 
 * todo syj
 * 1.获取派生钱包的助记词（用于获取sdz/zrm等钱包助记词）
 * 2.delete private key 和mnenomic
 * 3. uint(-1)是什么鬼
 */

const ethers = require('ethers');

console.log("\n1.创建HD钱包");
const mnemonic = "phrase sword gauge reveal capable subject album noise clever purse side major";
const HDNodeWallet = ethers.HDNodeWallet.fromPhrase(mnemonic);
console.log(HDNodeWallet);

console.log("\n2.通过HD钱包派生5个钱包");
const numWallet = 5;
//派生路径 m / purpose' / coin_type' / account' / change / address_index
let basePath = "m/44'/60'/0'/0";
let addresses = [];
for (let i=0; i<numWallet; i++) {
    let hdNodeNew = HDNodeWallet.derivePath(basePath + "/" + i);
    let walletNew = new ethers.Wallet(hdNodeNew.privateKey);
    addresses.push(walletNew);
    console.log("尝试获取派生钱包的助记词: ")
    // console.log(walletNew.mnemonic);
    console.log(hdNodeNew.mnemonic.phrase);
}
console.log(addresses);
// const oneWei = ethers.getBigInt(1);
const amounts = Array(5).fill(ethers.parseEther("0.000000000000000001"));
console.log(`发送数额: ${amounts}`);

console.log("\n3.创建provider和wallet,发送代币用");
const ALCHEMY_SEPOLIA_KEY = '2vsw2JgOi6Hq-6Ky9RvvKnL4f88kg5qZ';
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_KEY}`);
//用privatekey和provider创建wallet钱包，当然钱包要有代币和ETH
const privateKey = '5f5e109d57e793f4886f4b406b0e013e92c76b0273d3278e8a956af7d877dff0';
const wallet = new ethers.Wallet(privateKey, provider);

console.log("\n4.获取AirDrop合约实例");
const abiAirdrop = [
    "function multiTransferToken(address,address[],uint256[]) external",
    "function multiTransferETH(address[],uint256[]) public payable",
]
//AirDrop合约地址，sepolia testnet
const addressAirdrop = "0xaf94b537c4ddba04e50ed3840452e3129776801e";
const contractAirdrop = new ethers.Contract(addressAirdrop, abiAirdrop, wallet);

console.log("\n5.获取WETH代币合约实例");
const abiWETH = [
    "function balanceOf(address) public view returns(uint256)",
    "function transfer(address, uint256) public returns(bool)",
    "function approve(address, uint256) public returns(bool)",
];
const addressWETH = "0xc8ea610ba627aa39dea5c9f8064efadf61a287e0";
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);
//在sepolia testnet中直接调用合约write接口，往myAddress账户转入资金
const myAddress = "0x0fDb1Aa640682e180e5F59D5990D2E7CDc7014dB";


const main = async () => {
    console.log("\n6.读取一个地址的ETH和WETH余额");
    const balanceWETH = await contractWETH.balanceOf(myAddress);
    console.log(`我的账户${myAddress}的WETH代币余额为 ${ethers.formatEther(balanceWETH)}`);
    //todo syj 这个地方是不是可以有更简单的写法，provider已经包含了地址信息，不传地址参数行不？
    const balanceETH = await provider.getBalance(myAddress);
    console.log(`我的账户${myAddress}的ETH余额为 ${ethers.formatEther(balanceETH)}`);
    
 
    console.log("\n7.调用multiTransferETH函数, 给每个钱包转1 wei");
    //注意：value中传入的钱不能有余数，批量转账总共5wei，那么value就必须是5wei，
    //如果是10wei，那么就会报estimateGas错误（"Transfer amount error"）,当然这个报错也很有迷惑性
    //这个是因为multiTransferETH函数自身有个require要求，限制转多少传多少
    //其实如果没有如上限制，value是可以多传值的
    const tx = await contractAirdrop.multiTransferETH(addresses, amounts, {value: ethers.parseEther("0.000000000000000005")});
    //等待交易上链
    await tx.wait();
    //交易详情
    console.log(tx);
    const balanceETH2 = await provider.getBalance(addresses[0]);
    console.log(`发送给钱包${addresses[0].address}后，余额为: ${ethers.formatEther(balanceETH2)}`);

    console.log("\n8.调用multiTransferToken函数,给每个钱包发空投--批量转账")
    const txApprove = await contractWETH.approve(addressAirdrop, ethers.parseEther("1"));
    await txApprove.wait();
    console.log("给addressAirdrop授权完成");
    //发起交易，注意要保证当前钱包一定要有足够的余额，否则会报estimateGas错误，很有迷惑性，其实是
    //账户余额不足，而非gas不足
    const tx2 = await contractAirdrop.multiTransferToken(addressWETH, addresses, amounts);
    await tx2.wait();
    console.log("空投-批量发送代币WETH成功");
    const balanceWETH2 = await contractWETH.balanceOf(addresses[0]);
    console.log(`空投给钱包${addresses[0].address}后，代币余额为: ${ethers.formatEther(balanceWETH2)}`);
     
}
main();

