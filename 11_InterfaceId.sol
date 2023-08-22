/**
 * interfaceId生成逻辑
 * 根据“接口”中每个public、external函数的selector（不包含event事件），
 * 进行abi编码后计算keccak256哈希的前4字节
 */

interface myERC {
    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function setApprovalForAll(address operator, bool approved) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function isApprovedForAll(address owner, address operator) external view returns (bool);


}
contract MockInterfaceId {

    function test() public pure returns (bytes4 interfaceId) {
        interfaceId = type(myERC).interfaceId;
    }

    function test2() public pure returns (bytes4 interfaceId) {
        interfaceId = myERC.balanceOf.selector 
        ^ myERC.ownerOf.selector
        ^ bytes4(keccak256(abi.encodePacked("safeTransferFrom(address, address, uint256, bytes)")))
        ^ bytes4(keccak256(abi.encodePacked("safeTransferFrom(address, address, uint256)")))
        ^ myERC.transferFrom.selector
        ^ myERC.approve.selector
        ^ myERC.setApprovalForAll.selector
        ^ myERC.getApproved.selector
        ^ myERC.isApprovedForAll.selector;
    }



    
}