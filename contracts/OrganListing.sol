// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";

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
        string bloodGroup;
        uint256 expiryTime;
        string url;
    }

    mapping(uint256 => ListedOrgan) idToListedOrgan;

    event NewOrganListed(
        uint indexed organId,
        address indexed organContract,
        uint256 indexed tokenId,
        address donor,
        address recipient,
        bool allocated,
        string organType,
        string bloodGroup,
        uint256 expiryTime,
        string url
    );

    function ListOrgan(
        address cmoAddress,
        uint256 tokenId,
        string memory organType,
        string memory bloodGroup,
        string memory ipfsUrl
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
            organType,
            bloodGroup,
            block.timestamp + 18000,
            ipfsUrl
        );
        IERC721(cmoAddress).transferFrom(msg.sender, address(this), tokenId);

        emit NewOrganListed(
            organId,
            cmoAddress,
            tokenId,
            msg.sender,
            address(0),
            false,
            organType,
            bloodGroup,
            block.timestamp + 18000,
            ipfsUrl
        );
    }

    function AllocateOrgan(
        address cmoAddress,
        uint256 organId
    ) public nonReentrant {
        //if (!(idToListedOrgan[organId].status)) return "Organ has expired";

        uint tokenId = idToListedOrgan[organId].tokenId;

        IERC721(cmoAddress).transferFrom(address(this), msg.sender, tokenId);
        idToListedOrgan[organId].recipient = msg.sender;
        idToListedOrgan[organId].allocated = true;
        _organsAllocated.increment();
        //return "Organ allocated";
    }

    function fetchOrganItems() public view returns (ListedOrgan[] memory) {
        uint organCount = _organIds.current();
        uint unallocatedOrganCount = _organIds.current() -
            _organsAllocated.current();
        uint currentIndex = 0;

        ListedOrgan[] memory items = new ListedOrgan[](unallocatedOrganCount);

        for (uint i = 0; i < organCount; i++) {
            if (idToListedOrgan[i + 1].recipient == address(0)) {
                // check if the organ is allocated or not
                uint currentId = idToListedOrgan[i + 1].organId;
                ListedOrgan storage currentItem = idToListedOrgan[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return (items);
    }

    // function organTimer(uint256 expiry) public {
    //     uint organCount = _organIds.current();

    //     for (uint i = 0; i < organCount; i++) {
    //         uint currentId = idToListedOrgan[i + 1].organId;
    //         uint time = (block.timestamp -
    //             idToListedOrgan[currentId].expiryTime) /
    //             60 /
    //             60;
    //         if (time > expiry) idToListedOrgan[currentId].status = false;
    //     }
    // }

    //Fetch my Organ function is not required at this point of time

    // function fetchOrgansReceived() public view returns (ListedOrgan[] memory) {
    //     uint totalItemCount = _organIds.current();
    //     uint itemCount = 0;
    //     uint currentIndex = 0;

    //     for (uint i = 0; i < totalItemCount; i++) {
    //         if (idToListedOrgan[i + 1].recipient == msg.sender) {
    //             itemCount ++;
    //         }
    //     }

    //     ListedOrgan[] memory items = new ListedOrgan[](itemCount);

    //     for (uint i = 0; i < itemCount; i++) {
    //         if (idToListedOrgan[i + 1].recipient == msg.sender) {
    //             // check if the organ is allocated or not
    //             uint currentId = idToListedOrgan[i + 1].organId;
    //             ListedOrgan storage currentItem = idToListedOrgan[currentId];
    //             items[currentIndex] = currentItem;
    //             currentIndex++;
    //         }
    //     }
    //     return items;
    // }

    // function fetchOrgansDonated() public view returns (ListedOrgan[] memory) {
    //     uint totalItemCount = _organIds.current();
    //     uint itemCount = 0;
    //     uint currentIndex = 0;

    //     for (uint i = 0; i < totalItemCount; i++) {
    //         if (idToListedOrgan[i + 1].donor == msg.sender) {
    //             itemCount ++;
    //         }
    //     }

    //     ListedOrgan[] memory items = new ListedOrgan[](itemCount);

    //     for (uint i = 0; i < itemCount; i++) {
    //         if (idToListedOrgan[i + 1].donor == msg.sender) {
    //             // check if the organ is allocated or not
    //             uint currentId = idToListedOrgan[i + 1].organId;
    //             ListedOrgan storage currentItem = idToListedOrgan[currentId];
    //             items[currentIndex] = currentItem;
    //             currentIndex++;
    //         }
    //     }
    //     return items;
    // }
}
