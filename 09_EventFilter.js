/**
 * event事件监听过滤，只保留感兴趣的event事件 
 * const filter = contract.filters.EVENT_NAME(...agrs)
 * 
 * 1.监听来自于myAddress地址的transder事件
 * contract.filter.Transfer(myAddress) 
 * 
 * 2.监听所有发给myAddress地址的transder事件
 * contract.filter.Transfer(null, myAddress)
 * 
 * 3.监听所有从myAddress地址发给otherAddress地址的transder事件
 * contract.filter.Transfer(myAddress, otherAddress) 
 * 
 * 4.监听所有发给myAddress地址或otherAddress地址的transder事件
 * contract.filter.Transfer(null, [myAddress, otherAddress])
 * 
 * todo
 * 0.很奇怪，监听到的event事件中，根据from/to地址，根本找不到对应的交易信息！！！
 * 1.查阅ethers官网接口，接口很模糊
 * 2.明确USDT、莱特币、狗狗币等山寨币跟ETH、以太坊网络的关系
 * 3.币安热钱包是什么
 */

const ethers = require('ethers');

//获取节点服务商API接口
const ALCHEMY_SEPOLIA_KEY = 'y0RKCzMEoxxxxx_BbEQOZcqH';
const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_KEY}`);

//构建指定合约的实例
const abiUSDT = [
    "event Transfer(address indexed from,address indexed to,uint256 value)",
    "function balanceOf(address) public view returns(uint256)",
];
const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const contractUSDT = new ethers.Contract(addressUSDT, abiUSDT, provider);

const main = async () => {
    //币安交易所热钱包地址
    const addressBinance1 = '0x28C6c06298d514Db089934071355E5743bf21d60';
    const addressBinance2 = '0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549';
    
    const balanceUSDT = await contractUSDT.balanceOf(addressBinance2);
    console.log(`币安交易所热钱包USDT余额: ${ethers.formatUnits(balanceUSDT, 6)}\n`);
    
    console.log(`创建过滤器，监听USDT转入交易所`);
    let filterBinanceIn = contractUSDT.filters.Transfer(null, addressBinance2);
    console.log(`过滤器详情: `)
    console.log(filterBinanceIn);
    contractUSDT.on(filterBinanceIn, (res) => {
        console.log('----------监听USDT进入交易所---------------');
        console.log(`${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2], 6)}`);
    })

    console.log(`\n创建过滤器，监听USDT转出交易所`);
    let filterBinanceOut = contractUSDT.filters.Transfer(addressBinance2);
    console.log(`过滤器详情: `)
    console.log(filterBinanceOut);
    contractUSDT.on(filterBinanceOut, (res) => {
        console.log('----------监听USDT转出交易所---------------');
        console.log(`${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2], 6)}`);
    })
}
main()