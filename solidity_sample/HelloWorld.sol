// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;
import "hardhat/console.sol";

contract HelloWorld {

    uint public max = type(uint).max;
    uint public min = type(uint).min;
    uint public oneEther = 1 ether;
    //十六进制表示的地址，20个字节，40个十六进制，160个bit
    address public thisContract= (address(this));
    //十进制表示 160个bit的地址
    uint160 public what160 = uint160(address(this));
    //这个估计是填充0了
    uint public whatUint = uint(uint160(address(this)));

    function test() public view {
        // //声明内存动态数组，此时长度未知
        // uint[] memory arr = new uint[](3);
        // //使用时指定你需要的长度，一旦指定无法修改
        // arr = new uint[](3);


        uint x = max+1;
        //最大值+1，变成最小值0
        console.log(x);
        uint y = min-1;
        //最小值-1，变成最大值115792089237316195423570985008687907853269984665640564039457584007913129639935
        console.log(y);
        uint z = min-2;
        //最小值-2，变成次最大值115792089237316195423570985008687907853269984665640564039457584007913129639934
        console.log(z);

    }
}