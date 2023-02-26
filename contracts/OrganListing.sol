// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract OrganListing is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _organIds;
    Counters.Counter private _organsAllocated;

    struct ListedOrgan {
        uint organId;
        address organContract;
        uint256 tokenId;
        address donor;
        address recipient;
        bool allocated;
        string organType;
    }

    mapping(uint256 => ListedOrgan) idToListedOrgan;

    event NewOrganListed(
        uint indexed organId,
        address indexed organContract,
        uint256 indexed tokenId,
        address donor,
        address recipient,
        bool allocated,
        string organType
    );

    function ListOrgan(
        address cmoAddress,
        uint256 tokenId,
        string memory organType
    ) public nonReentrant {
        _organIds.increment();
        uint256 organId = _organIds.current();

        idToListedOrgan[organId] = ListedOrgan(
            organId,
            cmoAddress,
            tokenId,
            msg.sender,
            address(0),
            false,
            organType
        );
        IERC721(cmoAddress).transferFrom(msg.sender, address(this), tokenId);

        emit NewOrganListed(
            organId,
            cmoAddress,
            tokenId,
            msg.sender,
            address(0),
            false,
            organType
        );
    }

    function AllocateOrgan(
        address cmoAddress,
        uint256 organId
    ) public nonReentrant {
        uint tokenId = idToListedOrgan[organId].tokenId;

        IERC721(cmoAddress).transferFrom(address(this),msg.sender,tokenId);
        idToListedOrgan[organId].recipient = msg.sender;
        idToListedOrgan[organId].allocated = true;
        _organsAllocated.increment();

        

    }
}
