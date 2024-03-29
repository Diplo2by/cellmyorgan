// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Organ is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; //unique token ids
    address contractAddress;

    constructor(address cmoAddress) ERC721("Organ token identifiers", "ORG") {
        contractAddress = cmoAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment(); //increment ID every time
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);

        return newItemId;
    }
}
