// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * delegatecall的本质是通过B来改A（或者说使用A的上下文来执行B的逻辑），所以B看到的msg.sender、
 * msg.value都是A所看到的。举个栗子：Remix在调用A时，A偷懒，把活儿让B替自己干了
 * 
 */
contract B {
    // NOTE: storage layout must be the same as contract A
    uint public num;
    address public sender;
    uint public value;

    function setVars(uint _num) public payable {
        num = _num;
        sender = msg.sender;
        value = msg.value;
    }
}

contract A {
    uint public num;
    address public sender;
    uint public value;

    function setVars(address _contract, uint _num) public payable {
        // A's storage is set, B is not modified.
        (bool success, bytes memory data) = _contract.delegatecall(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );
    }
}
