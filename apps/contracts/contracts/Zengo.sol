// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";
import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";

interface ERC20Token {
    function transfer(address to, uint256 value) external returns (bool);
}

contract ZengoDAO is PermissionsEnumerable, ContractMetadata {
    address public owner;
    uint256 public registrationDuration;
    uint256 public pluralVotingPoints;
    address public votingTokenAddress; // Address of the ERC20 voting token
    address public deployer;

    // Modify the Design to facilitate current implementation
    struct Proposal {
        uint256 proposalId;
        string title;
        string proposalDescription;
        string proposalType;
        address proposer;
        Evidence proposerEvidence;
        Vote[] votingIterations;
        // requires funding
        bool isEligibleForFunding;
        bool isVerified;
    }

    struct Vote {
        uint256 proposalId;
        uint256 totalVotes;
        mapping (address => bool) vote; 
        Evidence[] evidences;
        string[] options; // should this be enums?
    }
    struct Evidence {
        string evidenceDescription;
        string streetAddress;
        string evidenceUri;
        uint256 latitude;
        uint256 longitude;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    mapping(address => bool) public moderators;
    address[] public moderatorList;

    mapping(address => uint256) public votingPoints;
    // mapping(uint256 => mapping(address => bool)) public hasVoted;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyModerator() {
        require(
            moderators[msg.sender],
            "Only moderators can call this function"
        );
        _;
    }

    constructor(
        uint256 _registrationDuration,
        uint256 _pluralVotingPoints,
        address _votingTokenAddress
    ) {
        owner = msg.sender;
        registrationDuration = _registrationDuration;
        pluralVotingPoints = _pluralVotingPoints;
        votingTokenAddress = _votingTokenAddress; // Set the address of the ERC20 voting token
        moderators[msg.sender] = true;
        moderatorList.push(msg.sender);
    }

    function addModerator(address _moderator) external onlyOwner {
        moderators[_moderator] = true;
        moderatorList.push(_moderator);
    }

    function removeModerator(address _moderator) external onlyOwner {
        moderators[_moderator] = false;
        for (uint256 i = 0; i < moderatorList.length; i++) {
            if (moderatorList[i] == _moderator) {
                moderatorList[i] = moderatorList[moderatorList.length - 1];
                moderatorList.pop();
                break;
            }
        }
    }

    function submitProposal(
        string calldata _title,
        string calldata _proposalDescription,
        string calldata _evidenceDescription,
        uint256 _latitude,
        uint256 _longitude,
        string _proposalType,
        string _streetAddress
    ) external {
        // require(
        //     votingPoints[msg.sender] > 0,
        //     "You need voting points to submit a proposal"
        // );

        Evidence memory newEvidence = Evidence({
            evidenceDescription: _evidenceDescription,
            streetAddress: _streetAddress,
            evidenceUri: _evidenceUri,
            latitude: _latitude,
            longitude: _longitude
        });

        Proposal memory newProposal = Proposal({
            proposalId: proposalCount,
            title: _title,
            proposalType: _proposalType,
            proposalDescription: _proposalDescription,
            proposer: msg.sender,
            isEligibleForFunding: false,
            isVerified: false,
            Evidence: newEvidence
        });

        proposals[proposalCount] = newProposal;
        proposalCount++;
    }

    // returns the proposal struct 
    function getProposalByID(uint256 _proposalId) external view returns (Proposal memory){
        return proposals[_proposalId];
    }

    function vote(uint256 _proposalId) external onlyModerator {
        require(
            !hasVoted[_proposalId][msg.sender],
            "You have already voted for this proposal"
        );

        proposals[_proposalId].votes += votingPoints[msg.sender];
        hasVoted[_proposalId][msg.sender] = true;
    }

    function allocateFunds(uint256 _proposalId) external onlyModerator {
        require(
            !proposals[_proposalId].isVerified,
            "The proposal is already funded"
        );

        // Ensure the proposal has received enough votes to be eligible for funding
        require(
            proposals[_proposalId].votes >= pluralVotingPoints,
            "Insufficient votes for funding"
        );

        // Transfer funds (voting tokens) from the contract to the proposal submitter
        ERC20Token votingToken = ERC20Token(votingTokenAddress);
        votingToken.transfer(
            proposals[_proposalId].submitter,
            proposals[_proposalId].votes
        );

        proposals[_proposalId].isVerified = true;
    }

    function setVotingPoints(
        address[] calldata _voters,
        uint256[] calldata _points
    ) external onlyModerator {
        require(_voters.length == _points.length, "Arrays length mismatch");

        for (uint256 i = 0; i < _voters.length; i++) {
            votingPoints[_voters[i]] = _points[i];
        }
    }

    function _canSetContractURI()
        internal
        view
        virtual
        override
        returns (bool)
    {
        return msg.sender == deployer;
    }
}
