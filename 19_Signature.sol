// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


// ECDSA库
library ECDSA{
    /**
     * @dev 通过ECDSA，验证签名地址是否正确，如果正确则返回true
     * _msgHash为消息的hash
     * _signature为签名
     * _signer为签名地址
     */
    function verify(bytes32 _msgHash, bytes memory _signature, address _signer) internal pure returns (bool) {
        return recoverSigner(_msgHash, _signature) == _signer;
    }

    // @dev 从_msgHash和签名_signature中恢复signer地址
    function recoverSigner(bytes32 _msgHash, bytes memory _signature) internal pure returns (address){
        // 检查签名长度，65是标准r,s,v签名的长度
        require(_signature.length == 65, "invalid signature length");
        bytes32 r;
        bytes32 s;
        uint8 v;
        // 目前只能用assembly (内联汇编)来从签名中获得r,s,v的值
        assembly {
            /*
            前32 bytes存储签名的长度 (动态数组存储规则)
            add(sig, 32) = sig的指针 + 32字节
            等效为略过signature的前32 bytes，即忽略第1个槽位，从下个槽位的起点开始
            mload(p) 载入从内存地址p起始的接下来32 bytes数据
            */
            // 读取长度数据后的32 bytes
            r := mload(add(_signature, 0x20))
            // 读取之后的32 bytes
            s := mload(add(_signature, 0x40))
            // 读取第一个byte
            v := byte(0, mload(add(_signature, 0x60)))
        }
        // 使用ecrecover(全局函数)：利用 msgHash 和 r,s,v 恢复 signer 地址
        return ecrecover(_msgHash, v, r, s);
    }
    
    /**
     * @dev 返回 以太坊签名消息
     * `hash`：消息哈希 
     * 遵从以太坊签名标准：https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`]
     * 以及`EIP191`:https://eips.ethereum.org/EIPS/eip-191`
     * 添加"\x19Ethereum Signed Message:\n32"字段，防止签名的是可执行交易。
     */
    function toEthSignedMessageHash(bytes32 hash) public pure returns (bytes32) {
        // 32 is the length in bytes of hash,
        // enforced by the type signature above
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }
}

contract SYJSignature is ERC721, Ownable {

    //项目方公钥
    address immutable public signer; 
    mapping(address => bool) public mintedAddress;   // 记录已经mint的地址

    constructor(address _signer) ERC721("SYJMERKLE", "SYJ")
    {
        signer = _signer;
    }

    // 利用ECDSA验证签名并mint
    function mint(address _account, uint256 _tokenId, bytes memory _signature)
    external
    {
         // 将_account和_tokenId打包消息
        bytes32 _msgHash = getMessageHash(_account, _tokenId);
        // 计算以太坊签名消息，该方法是个公用的，所以提取到library中
        bytes32 _ethSignedMessageHash = ECDSA.toEthSignedMessageHash(_msgHash); 
        // ECDSA检验通过
        require(verifySig(_ethSignedMessageHash, _signature), "Invalid signature"); 
        require(!mintedAddress[_account], "Already minted!"); // 地址没有mint过
                
        mintedAddress[_account] = true; // 记录mint过的地址
        _mint(_account, _tokenId); // mint
    }

    function getMessageHash(address account, uint256 tokenId) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(account, tokenId));
    }

    //msgHash消息哈希，signature消息签名, singer消息公钥
    function verifySig(bytes32 _ethSignedMessageHash, bytes memory _signature) internal view returns(bool) {
        return ECDSA.verify(_ethSignedMessageHash, _signature, signer);
    }
}