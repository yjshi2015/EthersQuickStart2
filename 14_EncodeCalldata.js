/**
 * 通过calldata的方式调用合约
 * 
 * todo syj
 * 1.完成普通的contract读写调用，再做对比
 */

const ethers = require('ethers');
const keyConfig = require('./ignore_keyConfig.json');

const provider = new ethers.JsonRpcApiProvider(keyConfig.RPCProvider['goerli.testnet']);

const privateKey = keyConfig.syj.privateKey;
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
