/**
 * interfaceId生成逻辑
 * 根据“接口”中每个public、external函数的selector（不包含event事件），
 * 进行abi编码后计算keccak256哈希的前4字节
 */

contract MockInterfaceId {

    function test() public pure returns (bytes4 interfaceId) {
        // interfaceId = type(IERC20).interfaceId;
        bytes4[] memory signatures = new bytes4[](9);
        signatures[0] = this.balanceOf.selector;
        signatures[1] = this.ownerOf.selector;
        signatures[2] = bytes4(keccak256(abi.encodePacked("safeTransferFrom(address,address,uint256,bytes)")));
        signatures[3] = bytes4(keccak256(abi.encodePacked("safeTransferFrom(address,address,uint256)")));
        signatures[4] = this.transferFrom.selector;
        signatures[5] = this.approve.selector;
        signatures[6] = this.setApprovalForAll.selector;
        signatures[8] = this.isApprovedForAll.selector;
        signatures[7] = this.getApproved.selector;
        interfaceId = bytes4(keccak256(abi.encodePacked(signatures)));
    }




    function balanceOf(address owner) external view returns (uint256 balance){}
    function ownerOf(uint256 tokenId) external view returns (address owner){}
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external{}
    function safeTransferFrom(address from, address to, uint256 tokenId) external{}
    function transferFrom(address from, address to, uint256 tokenId) external{}
    function approve(address to, uint256 tokenId) external{}
    function setApprovalForAll(address operator, bool approved) external{}
    function getApproved(uint256 tokenId) external view returns (address operator){}
    function isApprovedForAll(address owner, address operator) external view returns (bool){}


}