// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Zkoopa is ERC721, ERC721Enumerable {

    struct NFT {
        string name;
        string nftType;
    }

    NFT[] public zkoops;
    mapping(string => bool) userExist;

    constructor() ERC721("zkoopa", "biggy")  {

    }

    function getAllZkoopas() public view returns(NFT[] memory) {
        return zkoops;
    }

    function mint(string memory name, string memory nftType) public {
        require(!userExist[name], "This is not mintable.");
        zkoops.push(NFT(name, nftType));
        uint _id = zkoops.length - 1;
        _mint(msg.sender, _id);
        userExist[name] = true;
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
