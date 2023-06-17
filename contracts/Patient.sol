// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Patient {
    struct patientDetail {
        address patientAddress;
        string url;
        string patientName;
        uint patientAge;
        uint patientNumber;
        uint256 unixTime;
        bool allocated;
        string organType;
    }

    mapping(uint256 => patientDetail) private patientDetails;

    address[] private patientIndex;

    event NewPatientListed(
        address indexed patientAddress,
        string url,
        string patientName,
        uint patientAge,
        uint indexed patientNumber,
        uint256 unixTime,
        bool allocated,
        string organType
    );

    // Yet to be implemented
    event UpdatePatientListing(
        address indexed patientAddress,
        string url,
        string patientName,
        uint patientAge,
        uint indexed patientNumber,
        uint256 unixTime,
        bool allocated,
        string organType
    );

    // Yet to be implemented

    // function isPatient(
    //     address patientAddress
    // ) public view returns (bool isIndeed) {
    //     if (patientIndex.length == 0) {
    //         return false;
    //     }
    //     return (patientIndex[patientDetails[patientAddress].patientNumber] ==
    //         patientAddress);
    // }

    function getPatientCount() public view returns (uint count) {
        return patientIndex.length;
    }

    // Yet to be implemented

    // function getPatientAtIndex(
    //     uint index
    // ) public view returns (address patientAddress) {
    //     return patientIndex[index];
    // }

    function listNewPatient(
        address patientAddress,
        string memory url,
        string memory name,
        uint age,
        string memory organType
    ) public {
        patientIndex.push(patientAddress);
        uint patNumber = patientIndex.length - 1;
        patientDetails[patNumber].patientAddress = patientAddress;
        patientDetails[patNumber].url = url;
        patientDetails[patNumber].patientName = name;
        patientDetails[patNumber].patientAge = age;
        patientDetails[patNumber].unixTime = block.timestamp;
        patientDetails[patNumber].allocated = false;
        patientDetails[patNumber].patientNumber = patientIndex.length - 1;
        patientDetails[patNumber].organType = organType;

        emit NewPatientListed(
            patientAddress,
            url,
            name,
            age,
            patientIndex.length - 1,
            block.timestamp,
            false,
            organType
        );
    }

    // Yet to be implemented

    // function getPatient(
    //     address patientAddress
    // )
    //     public
    //     view
    //     returns (
    //         string memory url,
    //         string memory patientName,
    //         uint patientAge,
    //         uint patientNumber,
    //         uint256 unixTime,
    //         bool allocated,
    //         string memory
    //     )
    // {
    //     if (!isPatient(patientAddress)) {
    //         revert("Patient Doesnt exist");
    //     }
    //     return (
    //         patientDetails[patientAddress].url,
    //         patientDetails[patientAddress].patientName,
    //         patientDetails[patientAddress].patientAge,
    //         patientDetails[patientAddress].patientNumber,
    //         patientDetails[patientAddress].unixTime,
    //         patientDetails[patientAddress].allocated,
    //         patientDetails[patientAddress].organType
    //     );
    // }

    function getAllPatients() public view returns (patientDetail[] memory) {
        uint patientCount = getPatientCount();

        patientDetail[] memory items = new patientDetail[](patientCount);
        for (uint i = 0; i < patientIndex.length; i++) {
            //address currentAddress = patientIndex[i];
            items[i] = patientDetails[i];
        }

        return items;
    }

    function getAllAddress() public view returns (address[] memory) {
        address[] memory items = new address[](patientIndex.length);
        for (uint i = 0; i < patientIndex.length; i++) {
            items[i] = patientIndex[i];
        }
        return items;
    }
}
