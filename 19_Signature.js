/**
 * 通过签名分发白名单流程
 * 
 * 1.指定签名的钱包，服务器保管singer钱包的公私钥对
 * 2.对allowList白名单用户地址及tokenId，生成msgHash
 * 3.用signer钱包给msgHash签名,存储于中心化的后端
 * 4.部署NFT合约，并在初始化函数中写入签名的公钥
 * 5.用户mint时，填入address和tokenId，想中心化后端获取该地址的签名结果
 * 6.调用mint铸造
 * 
 * 相较于Merkle的优点：
 * ①动态，支持白名单的灵活添加和删除
 * ②更节省gas，Merkle中如果增加了白名单，需要改root，而这里不需要
 * 
 * todo syj
 * 1.验证JSON格式合约部署码
 * 2.合约发布失败，不管是Remix的bytecode还是JSON文件，哪怕demo拷贝过来，也是错误百出
 */

const {ethers} = require('ethers');
const keyConfig = require('./ignore_keyConfig.json');
const contractJson = require('./19_contract.json');

console.log("\n1.创建provider和wallet");
const provider = new ethers.JsonRpcProvider(keyConfig.RPCProvider['sepolica.testnet']);

const privateKey = keyConfig.syj.privateKey;
const wallet = new ethers.Wallet(privateKey, provider);
console.log(`wallet地址: ${wallet.address}`);

console.log("\n2.模拟中心化后端生成消息签名");
//大壮
const account = keyConfig.sdz.account;
const tokenId = 0;
//等效于solidity中keccak256(abi.encodePacked(account, tokenId))
const msgHash = ethers.solidityPackedKeccak256(
    ['address', 'uint256'],
    [account, tokenId]
)
console.log(`msgHash: ${msgHash}`)

const main = async () => {
    //用项目方钱包(私钥)生成签名
    const msgHashBytes = ethers.getBytes(msgHash);
    const signature = await wallet.signMessage(msgHashBytes);
    console.log(`签名:${signature}`)


    console.log("\n3.利用合约工厂部署合约");
    const abiNFT = [
        "constructor(address)",
        "function name() public view returns (string)",
        "function symbol() public view returns (string)",
        "function mint(address, uint256, bytes) external",
        "function ownerOf(uint256) public view returns (address)",
        "function balanceOf(address) public view returns (uint256)",
    ];
    //直接使用Remix的bytecode，而不是编译后文件中的object对象，那个字节码有问题
    const bytecodeNFT = contractJson.default.object;
    const factoryNFT = new ethers.ContractFactory(abiNFT, bytecodeNFT, wallet);

    const balanceETH = await provider.getBalance(wallet);
    console.log(`钱包ETH余额: ${ethers.formatEther(balanceETH)}`);
    if (ethers.formatEther(balanceETH) > 0.002) {
        console.log("开始部署合约")
        const contractNFT = await factoryNFT.deploy(wallet.address);
        console.log(`合约地址${contractNFT.target}`);
        console.log("等待合约部署上链");
        await contractNFT.waitForDeployment();
        console.log("合约已上链");
        console.log(`代币名称: ${await contractNFT.name()}`);
        console.log(`代币简称: ${await contractNFT.symbol()}`);

        console.log("\n4.调用mint函数, 利用签名验证白名单,给account账户铸造NFT");
        let tx = await contractNFT.mint(account, tokenId, signature);
        console.log("铸造中,等待交易上链")
        await tx.wait();
        console.log(`铸造成功，地址${account}的NFT余额为${await contractNFT.balanceOf(account)}`)
    } 
}
main()