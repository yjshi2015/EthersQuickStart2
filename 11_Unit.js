/**
 * 单位转换
 * 1.根据数值转换，大单位->小单位：ethers.formatUnits(value, unit)
 *   一步到位，直接转化成ether: ethers.formatEther(oneGwei)
 * 使用场景：钱包转账时，用于机器查看
 * 2.根据字符串转换，小单位->大单位: ethers.parseUnits(value, unit)
 *   一步到位，直接转化成wei: ethers.parseEther("1.0").toString()
 * 使用场景：钱包查看时，用于人查看
 * 
 * Note:数值带后缀n会自动转换成BigInt
 */
const ethers = require('ethers');

//从十进制字符串生成Bigint
const oneGwei = ethers.getBigInt("1000000000");
console.log(oneGwei);
//从十六进制字符串生成Bigint
console.log(ethers.getBigInt("0x3b9aca00"));
//从数字生成Bigint
console.log(ethers.getBigInt(1000000000));
console.log("js中最大安全数: ", Number.MAX_SAFE_INTEGER);
//以下会报错
console.log(ethers.getBigInt(Number.MAX_SAFE_INTEGER));

console.log("加法: ", oneGwei + 1n);
console.log("减法: ", oneGwei - 1n);
console.log("乘法: ", oneGwei * 2n);
console.log("除法: ", oneGwei / 2n);
console.log("是否相等: ", oneGwei == 1000000000n);

console.log("\n格式化：小单位转大单位， formatUnits ");
//1000000000
console.log(ethers.formatUnits(oneGwei, 0));
//1.0
console.log(ethers.formatUnits(oneGwei, "gwei"));
//1.0
console.log(ethers.formatUnits(oneGwei, 9));
//0.000000001
console.log(ethers.formatUnits(oneGwei, "ether"));
//1.0
console.log(ethers.formatUnits(1000000000, "gwei"));
//0.000000001,一步到位直接转为ether
console.log(ethers.formatEther(oneGwei));
console.groupEnd();

console.log('解析：大单位转小单位， parseUnits');
//1000000000000000000
console.log(ethers.parseUnits("1.0").toString());
//1000000000000000000
console.log(ethers.parseUnits("1.0", "ether").toString());
//1000000000000000000
console.log(ethers.parseUnits("1.0", 18).toString());
//1000000000
console.log(ethers.parseUnits("1.0", "gwei").toString());
//1000000000
console.log(ethers.parseUnits("1.0", 9).toString());
//1000000000000000000
console.log(ethers.parseEther("1.0").toString());
console.group()