// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Property is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;

    constructor() ERC721("Enri Properties", "EPRT") {}

    function mint(string memory tokenURI) public returns (uint256) {
        tokenIds.increment();

        uint256 newItemId = tokenIds.current();
        _mint(msg.sender, newItemId); 
        _setTokenURI(newItemId, tokenURI); 

        return newItemId;
    }

    function totalSupply() public view returns (uint256) {
        return tokenIds.current();
    }
}