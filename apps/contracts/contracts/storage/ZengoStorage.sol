// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../lib/Structs.sol";

contract ZengoStorage {
    address public owner;
    uint256 public registrationDuration;
    uint256 public pluralVotingPoints;
    address public votingTokenAddress; // Address of the ERC20 voting token
    address public deployer;

    mapping(uint256 => Structs.Proposal) public proposals;
    uint256 public proposalCount;

    mapping(address => bool) public moderators;
    address[] public moderatorList;
    mapping(address => Structs.Moderator) moderatorStruct;

    mapping(address => uint256) public votingPoints;

    function getModeratorInfo(
        address _moderator
    ) public view returns (Structs.Moderator memory) {
        require(moderators[_moderator], "Given address is not a Moderator");
        return moderatorStruct[_moderator];
    }

    function getModeratorsList() public view returns (address[] memory) {
        return moderatorList;
    }
}
