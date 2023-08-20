/**
 * 1、分别利用infura/alchemy节点服务器来访问以太坊区块链
 * infura服务器不支持ENS域名查询
 * 2、查阅ethers官方文档，熟悉下demo中的接口
 * 
 */

const ethers = require('ethers');
//利用infura的rpc节点连接到以太坊网络  todo syj 这行代码不能上传git 
const INFURA_KEY = 'ab6f690a7abd4xxxxa50';
//连接到以太坊主网，infura目前无法连接到主网
// const providerInfuraETH = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/ab6f690a7abd4c6d836a0454d5112a50`);
const providerInfuraETH = new ethers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_KEY}`);
//连接到测试网
const providerInfuraSepolia = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_KEY}`);

// //链接到Alchemy节点服务器  todo syj 这行代码不能上传git 
const ALCHEMY_KEY = 'y0RKCzMEoaxxxxbEQOZcqH';
const ALCHEMY_SEPOLIA_KEY = '2vsw2xxxxf88kg5qZ';
const providerAlchemyETH = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`);
const providerAlchemySepolia = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_KEY}`);

const main = async () => {

    //provider.getBalance()
    console.log(`1.查询不同节点服务商在不同网络上的V神账户余额`)
    const balanceInfura1 = await providerInfuraETH.getBalance(`0x69DF54c86D0AF49c6d7B4fdfB2e45970140D2e1b`);
    const balanceInfura2 = await providerInfuraSepolia.getBalance(`0x66288E5EAa4B4e22A38423f00A8e0E359bD71e78`);
    const balanceAlchemy1 = await providerAlchemyETH.getBalance(`vitalik.eth`);
    const balanceAlchemy2 = await providerAlchemySepolia.getBalance(`0x66288E5EAa4B4e22A38423f00A8e0E359bD71e78`);
    console.log(`Balance of vitalik : %s by Infura Main net \nBalance of vitalik : %s by Infura Test net \nBalance of vitalik : %s by Alchemy Main net \nBalance of vitalik : %s by Alchemy Test net \n`,
        ethers.formatEther(balanceInfura1),ethers.formatEther(balanceInfura2),
        ethers.formatEther(balanceAlchemy1),ethers.formatEther(balanceAlchemy2));
    
    //provider.getNetwork()
    console.log(`2.查询provider链接的以太坊链的信息`);
    const networkInfura1 = await providerInfuraETH.getNetwork();
    const networkInfura2 = await providerInfuraSepolia.getNetwork();
    const networkAlchemy1 = await providerAlchemyETH.getNetwork();
    const networkAlchemy2 = await providerAlchemySepolia.getNetwork();
    console.log(`blockchain info : %s by Infura Main net \nblockchain info : %s by Infura Test net \nblockchain info : %s by Alchemy Main net \nblockchain info : %s by Alchemy Test net \n`,
                networkInfura1.toJSON(), networkInfura2.toJSON(), networkAlchemy1.toJSON(), networkAlchemy2.toJSON());

    //provider.getBlockNumber()
    console.log(`3.查询当前区块的高度`);
    const blockNumInfura1 = await providerInfuraETH.getBlockNumber();
    const blockNumInfura2 = await providerInfuraSepolia.getBlockNumber();
    const blockNumAlchemy1 = await providerAlchemyETH.getBlockNumber();
    const blockNumAlchemy2 = await providerAlchemySepolia.getBlockNumber();
    console.log(`block number : %d by Infura Main net \nblock number : %d by Infura Test net \nblock number : %d by Alchemy Main net \nblock number : %d by Alchemy Test net \n`,
                blockNumInfura1, blockNumInfura2, blockNumAlchemy1, blockNumAlchemy2);
              
    //provider.getTransactionCount()
    console.log(`4.查询vitalik钱包交易次数`);
    const txCountInfura1 = await providerInfuraETH.getTransactionCount(`vitalik.eth`);
    const txCountInfura2 = await providerInfuraSepolia.getTransactionCount(`vitalik.eth`);
    const txCountAlchemy1 = await providerAlchemyETH.getTransactionCount(`vitalik.eth`);
    const txCountAlchemy2 = await providerAlchemySepolia.getTransactionCount(`vitalik.eth`);
    console.log(`vitalik tx count : %d by Infura Main net \nvitalik tx count : %d by Infura Test net \nvitalik tx count : %d by Alchemy Main net \nvitalik tx count : %d by Alchemy Test net \n`,
                txCountInfura1, txCountInfura2, txCountAlchemy1, txCountAlchemy2);
        
    //provider.getFeeData()
    console.log(`5.查询当前建议的gas设置`);
    const feeDataInfura1 = await providerInfuraETH.getFeeData();
    const feeDataInfura2 = await providerInfuraSepolia.getFeeData();
    const feeDataAlchemy1 = await providerAlchemyETH.getFeeData();
    const feeDataAlchemy2 = await providerAlchemySepolia.getFeeData();
    console.log(`feeData : %s by Infura Main net \nfeeData : %s by Infura Test net \nfeeData : %s by Alchemy Main net \nfeeData : %s by Alchemy Test net \n`,
                feeDataInfura1, feeDataInfura2, feeDataAlchemy1, feeDataAlchemy2);
   
    //provider.getBlock(blockNum)
    console.log(`6.获取创世区块信息`);
    const blockInfoInfura1 = await providerInfuraETH.getBlock(0);
    const blockInfoInfura2 = await providerInfuraSepolia.getBlock(0);
    const blockInfoAlchemy1 = await providerAlchemyETH.getBlock(0);
    const blockInfoAlchemy2 = await providerAlchemySepolia.getBlock(0);
    console.log(`genesis block info : %s by Infura Main net \ngenesis block info : %s by Infura Test net \ngenesis block info : %s by Alchemy Main net \ngenesis block info : %s by Alchemy Test net \n`,
                blockInfoInfura1, blockInfoInfura2, blockInfoAlchemy1, blockInfoAlchemy2);

    //provider.getCode() todo syj 待修改地址
    console.log(`7.查询合约的bytecode`);
    const byteCodeInfura1 = await providerInfuraETH.getCode('0x49048044D57e1C92A77f79988d21Fa8fAF74E97e');
    const byteCodeInfura2 = await providerInfuraSepolia.getCode('0x4a437E5b6BB844D0077c6383a76f43Ccd5Ab86d4');
    const byteCodeAlchemy1 = await providerAlchemyETH.getCode('0x49048044D57e1C92A77f79988d21Fa8fAF74E97e');
    const byteCodeAlchemy2 = await providerAlchemySepolia.getCode('0x4a437E5b6BB844D0077c6383a76f43Ccd5Ab86d4');
    console.log(`constract info : %s by Infura Main net \nconstract info : %s by Infura Test net \nconstract info : %s by Alchemy Main net \nconstract info : %s by Alchemy Test net \n`,
                byteCodeInfura1, byteCodeInfura2, byteCodeAlchemy1, byteCodeAlchemy2);
}

main();