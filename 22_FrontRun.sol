// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Freemint is ERC721 {
    uint256 public totalSupply;

    //构造函数，初始化NFT合集的名称、代号
    constructor() ERC721("Free Mint NFT", "FreeMint") {}

    //铸造函数
    // todo syj 这个函数看着别扭
    function mint() external {
        _mint(msg.sender, totalSupply);
        totalSupply++;
    }
}