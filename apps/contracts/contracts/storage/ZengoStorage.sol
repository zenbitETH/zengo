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
    mapping(address => uint256) public proposers;
    uint256 public proposalCount;

    mapping(address => bool) public moderators;
    address[] public moderatorList;
    mapping(address => Structs.Moderator) public moderatorStruct;

    mapping(address => uint256) public votingPoints;
    mapping(uint256 => Structs.Vote[]) public voteIterations;
    mapping(uint256 => mapping (uint8 => Structs.Evidence[])) public Evidence;
    mapping(uint256 => mapping (uint8 => mapping (address => Structs.VerificationState))) public vote;
    mapping(uint256 => mapping (uint8 => mapping (address => bool))) public hasVoted;
    mapping(uint256 => mapping (uint8 => mapping (Structs.VerificationState => uint256))) public voteCount;
    mapping(uint256 => Structs.Evidence) public proposalEvidence;

    function getModeratorInfo(address _moderator) public view returns (Structs.Moderator memory) {
        require(moderators[_moderator], "Given address is not a Moderator");
        return moderatorStruct[_moderator];
    }

    function getModeratorsList() public view returns (address[] memory) {
        return moderatorList;
    }

    function getModerators() public view returns (Structs.Moderator[] memory) {
        Structs.Moderator[] memory moderatorsStructArray = new Structs.Moderator[](moderatorList.length);
        for (uint256 i = 0; i < moderatorList.length; i++) {
            moderatorsStructArray[i].moderatorType = moderatorStruct[moderatorList[i]].moderatorType;
            moderatorsStructArray[i].position = moderatorStruct[moderatorList[i]].position;
            moderatorsStructArray[i].organization = moderatorStruct[moderatorList[i]].organization;
        }
        return moderatorsStructArray;
    }

    // function getProposals() public view returns (Structs.Proposal[] memory, Structs.Vote[] memory, Structs.Evidence[] memory) {
    //     Structs.Proposal[] memory proposalsArray = new Structs.Proposal[](proposalCount+1);

    //     for (uint256 i = 0; i < proposalCount + 1; i++) {
    //         proposalsArray[i].votingIterationCount = proposals[i].votingIterationCount;
    //         proposalsArray[i].proposalId = proposals[i].proposalId;
    //         proposalsArray[i].title = proposals[i].title;
    //         proposalsArray[i].proposalDescription = proposals[i].proposalDescription;
    //         proposalsArray[i].proposalType = proposals[i].proposalType;
    //         proposalsArray[i].proposer = proposals[i].proposer;
    //         proposalsArray[i].isEligibleForFunding = proposals[i].isEligibleForFunding;
    //         proposalsArray[i].isVerified = proposals[i].isVerified;
    //         proposalsArray[i].verificationState = proposals[i].verificationState;
    //     }
    //     return proposalsArray;
    // }
    
    // function getProposalById(uint256 _proposalId) public view returns (Structs.ProposalReturn memory) {
    //     Structs.ProposalReturn memory proposal;
    //     // Structs.Vote[] memory voteIterations;

    //     proposal.votingIterationCount = proposals[_proposalId].votingIterationCount;
    //     proposal.proposalId = proposals[_proposalId].proposalId;
    //     proposal.title = proposals[_proposalId].title;
    //     proposal.proposalDescription = proposals[_proposalId].proposalDescription;
    //     proposal.proposalType = proposals[_proposalId].proposalType;
    //     proposal.proposer = proposals[_proposalId].proposer;
    //     proposal.isEligibleForFunding = proposals[_proposalId].isEligibleForFunding;
    //     proposal.isVerified = proposals[_proposalId].isVerified;
    //     proposal.verificationState = proposals[_proposalId].verificationState;
        
    //     return proposal;
    // }

}