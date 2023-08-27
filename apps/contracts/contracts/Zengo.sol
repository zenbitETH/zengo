// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";
import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Constants.sol";

contract ZengoDAO is PermissionsEnumerable, ContractMetadata, Constants {
    IERC20 public token;
    address public owner;
    uint256 public registrationDuration;
    uint256 public pluralVotingPoints;
    address public votingTokenAddress; // Address of the ERC20 voting token
    address public deployer;

    event ModeratorAdded(address indexed newModerator);
    event ModeratorRemoved(address indexed removedModerator);
    event ProposalSubmitted(Proposal newProposal, Evidence newEvidence);

    // Modify the Design to facilitate current implementation
    struct Proposal {
        uint8 votingIterationCount;
        uint256 proposalId;
        string title;
        string proposalDescription;
        string proposalType;
        address proposer;
        Evidence proposalEvidence;
        Vote[] votingIterations;
        VerificationState verificationState;
        // requires funding
        bool isEligibleForFunding;
        bool isVerified;
    }

    struct Vote {
        uint8 votingIteration;
        uint256 proposalId;
        uint256 totalVotes;
        bool inProgress;
        mapping(address => VerficationState) vote;
        mapping(address => bool) hasVoted;
        Evidence[] evidences;
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
        address _tokenAddress
    ) {
        owner = msg.sender;
        registrationDuration = _registrationDuration;
        pluralVotingPoints = _pluralVotingPoints;
        token = IERC20(_tokenAddress);
        moderators[msg.sender] = true;
        moderatorList.push(msg.sender);
    }

    function addModerator(address _moderator) external onlyOwner {
        moderators[_moderator] = true;
        moderatorList.push(_moderator);
        emit ModeratorAdded(_moderator);
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
        emit ModeratorRemoved(_moderator);
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
            votingIterationCount: 0,
            // Check if this works
            verificationState: VerificationState(0),
            proposalEvidence: newEvidence
        });

        intializeVotingIteration(proposalCount);

        emit ProposalSubmitted(newProposal, newEvidence);

        proposals[proposalCount] = newProposal;
        proposalCount++;
    }

    // returns the proposal struct
    function getProposalByID(
        uint256 _proposalId
    ) external view returns (Proposal memory) {
        return proposals[_proposalId];
    }

    function setIndividualVotingPoints(
        address calldata _voter,
        uint256 calldata _points
    ) external onlyModerator {
        votingPoints[_voters] = _points;
    }

    function setVotingPoints(uint256 _points) external onlyOwner {
        for (uint256 i = 0; moderatorList.length; i++) {
            moderators[moderatorList[i]] = _points;
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

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    // TODO: from here on

    function voteToClassifyProposal(
        uint8 _vote,
        uint8 _votingIteration,
        uint256 _proposalId
    ) external onlyModerator {
        require(
            _vote <= uint8(VerificationState.ApproveForFunding),
            "Out of Range / Invalid vote option"
        );

        Vote memory votingIteration = proposals[_proposalId].votingIterations[
            _votingIteration
        ];

        require(
            !votingIteration.hasVoted[msg.sender],
            "You have already voted for this Voting Iteration of this proposal"
        );
        votingIteration.vote[msg.sender] = VerificationState(_vote);
        votingIteration.hasVoted[msg.sender] = true;
    }

    function concludeVotingIteration(uint8 _votingIteration, uint256 _proposalId) onlyModerator {
        require(proposals[_proposalId].votingIterations[_votingIteration].inProgress, "Voting Iteration doesn't exist or had already concluded");
        
        Vote memory votingIteration = proposals[_proposalId].votingIterations[_votingIteration];
        //TODO: add stateTransition and Voting Logic
    }

    function intializeVotingIteration(uint256 _proposalId) internal {
        Vote[] memory newVotingIteration = Vote({
            votingIteration: 0,
            proposalId: _proposalId,
            totalVotes: 0,
            inProgress: true
        });
        proposals[_proposalId].votingIterations.push(newVotingIteration);
        proposals[_proposalId].votingIterationCount++;
    }

    function addVotingIteration(uint256 _proposalId) external onlyModerator {
        uint8 currentVoteIteration = proposals[_proposalId]
            .votingIterationCount;
        Vote[] memory newVotingIteration = Vote({
            votingIteration: currentVoteIteration,
            proposalId: _proposalId,
            totalVotes: 0,
            inProgress: true
        });
        proposals[_proposalId].votingIterations.push(newVotingIteration);
        proposals[_proposalId].votingIterationCount++;
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
}
