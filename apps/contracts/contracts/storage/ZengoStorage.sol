// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../lib/Structs.sol";

contract ZengoStorage {
    uint256 public pluralVotingPoints;
    uint256 public proposalCount = 0;
    uint256 public voteIterationsCount = 0;
    uint256 public evidences = 0;
    uint256 public GOVERNANCE_CYCLE = 0;

    address public owner;
    address public rewardTokenAddress; // Address of the ERC20 voting token
    address public deployer;

    address[] public moderatorList;

    mapping(uint256 => mapping(uint256 => Structs.Proposal)) public proposals;
    mapping(uint256 => mapping(address => uint256)) public proposers;

    mapping(address => bool) public moderators;
    mapping(address => Structs.Moderator) public moderatorStruct;

    mapping(uint256 => mapping(address => uint256)) public votingPoints;
    mapping(uint256 => mapping(uint256 => Structs.Vote[])) public voteIterations;

    mapping(uint256 => mapping(uint256 => Structs.Evidence)) public proposalEvidence;
    mapping(uint256 => mapping(uint256 => mapping(uint8 => Structs.Evidence[]))) public votingIterationEvidence;

    mapping(uint256 => mapping(uint256 => mapping(uint8 => mapping(address => Structs.VerificationState)))) public vote;
    mapping(uint256 => mapping(uint256 => mapping(uint8 => mapping(address => bool)))) public hasVoted;
    mapping(uint256 => mapping(uint256 => mapping(uint8 => mapping(Structs.VerificationState => uint256)))) public
        voteCount;

    function getModeratorInfo(address _moderator) public view returns (Structs.Moderator memory) {
        require(moderators[_moderator], "Given address is not a Moderator");
        return moderatorStruct[_moderator];
    }

    function getModeratorsList() public view returns (address[] memory) {
        return moderatorList;
    }

    function getModerators() public view returns (Structs.Moderator[] memory) {
        Structs.Moderator[] memory moderatorsStructArray = new Structs.Moderator[](
                moderatorList.length
            );
        for (uint256 i = 0; i < moderatorList.length; i++) {
            moderatorsStructArray[i].moderatorType = moderatorStruct[moderatorList[i]].moderatorType;
            moderatorsStructArray[i].position = moderatorStruct[moderatorList[i]].position;
            moderatorsStructArray[i].organization = moderatorStruct[moderatorList[i]].organization;
        }
        return moderatorsStructArray;
    }

    function getAllProposals()
        public
        view
        returns (Structs.Proposal[] memory, Structs.Vote[] memory, Structs.Evidence[] memory)
    {
        Structs.Proposal[] memory proposalsArray = new Structs.Proposal[](
            proposalCount + 1
        );
        Structs.Vote[] memory voteIterationsArray = new Structs.Vote[](
            voteIterationsCount + 1
        );
        Structs.Evidence[] memory evidencesArray = new Structs.Evidence[](
            evidences + 1
        );
        uint256 count = 0;
        uint256 eCount = 0;

        for (uint256 i = 0; i < proposalCount + 1; i++) {
            proposalsArray[i].votingIterationCount = proposals[GOVERNANCE_CYCLE][i].votingIterationCount;
            proposalsArray[i].proposalId = proposals[GOVERNANCE_CYCLE][i].proposalId;
            proposalsArray[i].title = proposals[GOVERNANCE_CYCLE][i].title;
            proposalsArray[i].proposalDescription = proposals[GOVERNANCE_CYCLE][i].proposalDescription;
            proposalsArray[i].proposalType = proposals[GOVERNANCE_CYCLE][i].proposalType;
            proposalsArray[i].proposer = proposals[GOVERNANCE_CYCLE][i].proposer;
            proposalsArray[i].isEligibleForFunding = proposals[GOVERNANCE_CYCLE][i].isEligibleForFunding;
            proposalsArray[i].isVerified = proposals[GOVERNANCE_CYCLE][i].isVerified;
            proposalsArray[i].verificationState = proposals[GOVERNANCE_CYCLE][i].verificationState;
            proposalsArray[i].streetAddress = proposals[GOVERNANCE_CYCLE][i].streetAddress;
            proposalsArray[i].latitude = proposals[GOVERNANCE_CYCLE][i].latitude;
            proposalsArray[i].longitude = proposals[GOVERNANCE_CYCLE][i].longitude;
            proposalsArray[i].createdAt = proposals[GOVERNANCE_CYCLE][i].createdAt;
            for (uint256 j = 0; j < proposals[GOVERNANCE_CYCLE][i].votingIterationCount; j++) {
                voteIterationsArray[count].votingIteration = voteIterations[GOVERNANCE_CYCLE][i][j].votingIteration;
                voteIterationsArray[count].proposalId = voteIterations[GOVERNANCE_CYCLE][i][j].proposalId;
                voteIterationsArray[count].totalVotes = voteIterations[GOVERNANCE_CYCLE][i][j].totalVotes;
                voteIterationsArray[count].inProgress = voteIterations[GOVERNANCE_CYCLE][i][j].inProgress;
                voteIterationsArray[count].resultState = voteIterations[GOVERNANCE_CYCLE][i][j].resultState;
                count++;
                for (uint256 k = 0; k < voteIterations[GOVERNANCE_CYCLE][i][j].evidenceCount; k++) {
                    evidencesArray[eCount].evidenceDescription =
                        votingIterationEvidence[GOVERNANCE_CYCLE][i][uint8(j)][k].evidenceDescription;
                    evidencesArray[eCount].evidenceUri =
                        votingIterationEvidence[GOVERNANCE_CYCLE][i][uint8(j)][k].evidenceUri;
                    evidencesArray[eCount].evidenceTimestamp =
                        votingIterationEvidence[GOVERNANCE_CYCLE][i][uint8(j)][k].evidenceTimestamp;
                    eCount++;
                }
            }
        }
        return (proposalsArray, voteIterationsArray, evidencesArray);
    }

    // function getAllVoteIterations() public view returns (Structs.Vote[] memory) {

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
