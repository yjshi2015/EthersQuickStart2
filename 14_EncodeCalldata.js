/**
 * 通过calldata的方式调用合约
 * 
 * todo syj
 * 1.完成普通的contract读写调用，再做对比
 */

const ethers = require('ethers');

const ALCHEMAY_GOERLI_KEY = 'dTKTdrFoicAZBCIROLne9B8ranAu7foA';
const provider = `https://eth-goerli.g.alchemy.com/v2/${ALCHEMAY_GOERLI_KEY}`;

const privateKey = '5f5e109d57e793f4886f4b406b0e013e92c76b0273d3278e8a956af7d877dff0';
const wallet = new ethers.Wallet(privateKey, provider);
const myAddress = wallet.address;

const abiWETH = [
    "function deposit() public payable",
    "function balanceOf(address) public view returns(uint256)",
];
const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6';
const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider);


const main = async () => {
    console.log('\n1.读取WETH余额');
    //编码calldata
    const param1 = contractWETH.interface.encodeFunctionData(
        "balanceOf",
        [myAddress]
    );
    console.log(`编码结果: ${param1}`);
    //创建交易
    const tx1 = {
        to: addressWETH,
        data: param1
    }
    //发起交易，可读操作（view/pure)可以用provider.call(tx)
    const balanceWETH = await provider.call(tx1);
    console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}`);
}
main()
