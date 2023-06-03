// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Patient {
    struct patientDetail {
        string url;
        string patientName;
        uint patientAge;
        uint patientNumber;
        uint256 unixTime;
        bool allocated;
    }

    mapping(address => patientDetail) private patientDetails;

    address[] private patientIndex;

    event NewPatientListed(
        address indexed patientAddress,
        string url,
        string patientName,
        uint patientAge,
        uint indexed patientNumber,
        uint256 unixTime,
        bool allocated
    );

    event UpdatePatientListing(
        address indexed patientAddress,
        string url,
        string patientName,
        uint patientAge,
        uint indexed patientNumber,
        uint256 unixTime,
        bool allocated
    );

    function isPatient(
        address patientAddress
    ) public view returns (bool isIndeed) {
        if (patientIndex.length == 0) {
            return false;
        }
        return (patientIndex[patientDetails[patientAddress].patientNumber] ==
            patientAddress);
    }

    function getPatientCount() public view returns (uint count) {
        return patientIndex.length;
    }

    function getPatientAtIndex(
        uint index
    ) public view returns (address patientAddress) {
        return patientIndex[index];
    }

    function listNewPatient(
        address patientAddress,
        string memory url,
        string memory name,
        uint age
    ) public {
        patientDetails[patientAddress].url = url;
        patientDetails[patientAddress].patientName = name;
        patientDetails[patientAddress].patientAge = age;
        patientDetails[patientAddress].unixTime = block.timestamp;
        patientDetails[patientAddress].allocated = false;
        patientIndex.push(patientAddress);
        patientDetails[patientAddress].patientNumber = patientIndex.length - 1;

        emit NewPatientListed(
            patientAddress,
            url,
            name,
            age,
            patientIndex.length - 1,
            block.timestamp,
            false
        );
    }

    function getPatient(
        address patientAddress
    )
        public
        view
        returns (
            string memory url,
            string memory patientName,
            uint patientAge,
            uint patientNumber,
            uint256 unixTime,
            bool allocated
        )
    {
        if (!isPatient(patientAddress)) {
            revert("Patient Doesnt exist");
        }
        return (
            patientDetails[patientAddress].url,
            patientDetails[patientAddress].patientName,
            patientDetails[patientAddress].patientAge,
            patientDetails[patientAddress].patientNumber,
            patientDetails[patientAddress].unixTime,
            patientDetails[patientAddress].allocated
        );
    }
}
