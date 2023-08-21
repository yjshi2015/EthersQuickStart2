/**
 * @title 再识ERC20
 * @author syj
 * @notice 
 * 1.实现了IERC20接口的一定是ERC20代币
 * 2.即使没有实现IERC20接口，但是拥有IERC20所定义的函数，也依然是ERC20代币，
 *   可以在钱包中进行转账，增加代币流动性
 * 3.没有实现IERC20接口，也没有拥有IERC20所定义的函数，但是自身的函数具有IERC20
 *   所拥有的功能，例如转账、查询余额、授权等，依旧是普通智能合约，不能够在钱包中
 *   进行转入/转出操作。
 */
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract MockToken {

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);

    uint public totalSupply;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    string public name = "MOCK-TOKEN";
    string public symbol = "MOCK";
    uint8 public decimals = 18;

    //初始化10w个代币
    constructor () {
        balanceOf[msg.sender] = 100000 * 1000000000000000000;
        totalSupply = 100000 * 1000000000000000000;
    }

    function transfer(address recipient, uint amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function burn(uint amount) external {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
}