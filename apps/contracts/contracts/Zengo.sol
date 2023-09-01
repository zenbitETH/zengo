// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";
// import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Constants.sol";
import "./lib/Structs.sol";
import "./storage/ZengoStorage.sol";

contract ZengoDAO is Constants, ZengoStorage {
    IERC20 public token;

    event ModeratorAdded(address indexed newModerator);
    event ModeratorRemoved(address indexed removedModerator);
    // nested mapping cannot be emitted in events
    // event ProposalSubmitted(Proposal newProposal, Evidence newEvidence);


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

    // TODO: constructing a constructor like this
    // doesn't work figure out how to write it
    function submitProposal(
        string memory _title,
        string memory _proposalDescription,
        string memory _evidenceDescription,
        string memory _evidenceUri,
        string memory _proposalType,
        string memory _streetAddress,
        uint256 _latitude,
        uint256 _longitude
    ) external {
        // require(
        //     votingPoints[msg.sender] > 0,
        //     "You need voting points to submit a proposal"
        // );

        // Evidence storage newEvidence = Evidence({

        // });

        Structs.Proposal storage newProposal = proposals[proposalCount];
        // Structs.Proposal storage newProposal = 

        Structs.Evidence memory newEvidence = Structs.Evidence(_evidenceDescription, _streetAddress, _evidenceUri, _latitude, _longitude);

        // proposals[proposalCount] = Structs.Proposal(0, proposalCount, _title, _proposalDescription, _proposalType, msg.sender, newEvidence, [], Structs.VerificationState(0), false, false);

        
        newProposal.proposalId = proposalCount;
        newProposal.title = _title;
        newProposal.proposalType = _proposalType;
        newProposal.proposalDescription = _proposalDescription;
        newProposal.proposer = msg.sender;
        newProposal.isEligibleForFunding = false;
        newProposal.isVerified = false;
        newProposal.votingIterationCount = 0;
        newProposal.verificationState = Structs.VerificationState(0);
        newProposal.proposalEvidence = newEvidence;

        intializeVotingIteration(proposalCount);

        // emit ProposalSubmitted(newProposal, newEvidence);

        // proposals[proposalCount] = newProposal;
        proposalCount++;
    }

    // TODO: cannot return struct from a function
    // returns the proposal struct
    // function getProposalByID(
    //     uint256 _proposalId
    // ) external view returns (Proposal memory) {
    //     return proposals[_proposalId];
    // }

    function setIndividualVotingPoints(
        address _voter,
        uint256 _points
    ) external onlyModerator {
        votingPoints[_voter] = _points;
    }

    // function setVotingPoints(uint256 _points) external onlyOwner {
    function setVotingPoints(uint256 _points) external onlyModerator {
        for (uint256 i = 0; i < moderatorList.length; i++) {
            votingPoints[moderatorList[i]] = _points;
        }
    }

    // function _canSetContractURI()
    //     internal
    //     view
    //     virtual
    //     override
    //     returns (bool)
    // {
    //     return msg.sender == deployer;
    // }

    function voteToClassifyProposal(
        uint8 _vote,
        uint8 _votingIteration,
        uint256 _proposalId
    ) external onlyModerator {
        require(
            _vote <= uint8(Structs.VerificationState.ApproveForFunding),
            "Out of Range / Invalid vote option"
        );

        Structs.Vote storage votingIteration = proposals[_proposalId].votingIterations[
            _votingIteration
        ];

        require(
            !votingIteration.hasVoted[msg.sender],
            "You have already voted for this Voting Iteration of this proposal"
        );
        votingIteration.vote[msg.sender] = Structs.VerificationState(_vote);
        votingIteration.hasVoted[msg.sender] = true;
        votingIteration.voteCount[Structs.VerificationState(_vote)]++;
        // TODO: trigger concludeVotingIteration when one of the
        // consensusIteration reaches the threshold votesPercents
        if (
            (votingIteration.voteCount[Structs.VerificationState(_vote)] * 100) >
            moderatorList.length * THRESHOLD_VOTE_LIMIT
        ) {
            autoTriggerVoteResult(
                _votingIteration,
                _proposalId,
                Structs.VerificationState(_vote)
            );
        }
    }

    function autoTriggerVoteResult(
        uint8 _votingIteration,
        uint256 _proposalId,
        Structs.VerificationState _resultState
    ) internal {
        if (_resultState == Structs.VerificationState(1) || _resultState == Structs.VerificationState(2) || _resultState == Structs.VerificationState(3)) {
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .inProgress = true;
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .resultState = _resultState;
            // TODO: emit Event that proposal is now respective
            // verification state that can require further
            // voting iterations
            // TODO: trigger addVoteIteration with respective
            // Result State
        } else if (_resultState == Structs.VerificationState(4)) {
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .inProgress = false;
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .resultState = _resultState;
            proposals[_proposalId].isEligibleForFunding = false;
            proposals[_proposalId].isVerified = true;
            // TODO: emit Event that proposal is completed and
            // doesn't require any funding
        } else if (_resultState == Structs.VerificationState(5)) {
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .inProgress = false;
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .resultState = _resultState;
            proposals[_proposalId].isEligibleForFunding = false;
            proposals[_proposalId].isVerified = false;
            // TODO: emit Event that proposal is rejected or spam and
            // is ineligible for funding
        } else if (_resultState ==Structs.VerificationState(6)) {
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .inProgress = false;
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .resultState = _resultState;
            proposals[_proposalId].isEligibleForFunding = true;
            proposals[_proposalId].isVerified = true;
            // TODO: emit Event that proposal is approved for funding
        }
    }

    // Should this be callable by moderator?
    function concludeVotingIteration(
        uint8 _votingIteration,
        uint256 _proposalId
    ) external onlyModerator {
        // TODO: check global State
        // TODO: check zero Votes
        require(
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .inProgress,
            "Voting Iteration doesn't exist or has already concluded"
        );

        // Load the votingIteration from the proposal
        Structs.Vote storage votingIteration = proposals[_proposalId].votingIterations[
            _votingIteration
        ];
        //  TODO: add stateTransition and Voting Logic
        //  Done

        uint8 result = 0;
        for (uint8 i = 0; i < 6; i++) {
            if (
                uint8(votingIteration.voteCount[Structs.VerificationState(i)]) > result
            ) {
                result = uint8(votingIteration.voteCount[Structs.VerificationState(i)]);
            }
        }
        if (result == 1 || result == 2 || result == 3) {
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .inProgress = true;
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .resultState = Structs.VerificationState(result);
            // TODO: emit Event that proposal is now respective
            // verification state that can require further
            // voting iterations
            // TODO: trigger addVoteIteration with respective
            // Result State
        } else if (result == 4) {
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .inProgress = false;
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .resultState = Structs.VerificationState(result);
            proposals[_proposalId].isEligibleForFunding = false;
            proposals[_proposalId].isVerified = true;
            // TODO: emit Event that proposal is completed and
            // doesn't require any funding
        } else if (result == 5) {
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .inProgress = false;
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .resultState = Structs.VerificationState(result);
            proposals[_proposalId].isEligibleForFunding = false;
            proposals[_proposalId].isVerified = false;
            // TODO: emit Event that proposal is rejected or spam and
            // is ineligible for funding
        } else if (result == 6) {
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .inProgress = false;
            proposals[_proposalId]
                .votingIterations[_votingIteration]
                .resultState = Structs.VerificationState(result);
            proposals[_proposalId].isEligibleForFunding = true;
            proposals[_proposalId].isVerified = true;
            // TODO: emit Event that proposal is approved for funding
        }
    }

    function intializeVotingIteration(uint256 _proposalId) internal {

        // uint256 memory length = proposals[_proposalId].votingIterations.length;
        proposals[_proposalId].votingIterations.push();

        proposals[_proposalId].votingIterations[proposals[_proposalId].votingIterationCount].votingIteration = 0;
        proposals[_proposalId].votingIterations[proposals[_proposalId].votingIterationCount].proposalId = _proposalId;
        proposals[_proposalId].votingIterations[proposals[_proposalId].votingIterationCount].totalVotes = 0;
        proposals[_proposalId].votingIterations[proposals[_proposalId].votingIterationCount].inProgress = true;

        proposals[_proposalId].votingIterationCount++;
    }

    function addVotingIteration(uint256 _proposalId) external onlyModerator {
        uint8 currentVoteIteration = proposals[_proposalId]
            .votingIterationCount;

        // uint256 memory length = proposals[_proposalId].votingIterations.length;
        proposals[_proposalId].votingIterations.push();

        proposals[_proposalId].votingIterations[proposals[_proposalId].votingIterationCount].votingIteration = currentVoteIteration;
        proposals[_proposalId].votingIterations[proposals[_proposalId].votingIterationCount].proposalId = _proposalId;
        proposals[_proposalId].votingIterations[proposals[_proposalId].votingIterationCount].totalVotes = 0;
        proposals[_proposalId].votingIterations[proposals[_proposalId].votingIterationCount].inProgress = true;

        proposals[_proposalId].votingIterationCount++;
    }

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    // TODO: from here on

    // function vote(uint256 _proposalId) external onlyModerator {
    //     require(
    //         !hasVoted[_proposalId][msg.sender],
    //         "You have already voted for this proposal"
    //     );

    //     proposals[_proposalId].votes += votingPoints[msg.sender];
    //     hasVoted[_proposalId][msg.sender] = true;
    // }

    // function allocateFunds(uint256 _proposalId) external onlyModerator {
    //     require(
    //         !proposals[_proposalId].isVerified,
    //         "The proposal is already funded"
    //     );

    //     // Ensure the proposal has received enough votes to be eligible for funding
    //     require(
    //         proposals[_proposalId].votes >= pluralVotingPoints,
    //         "Insufficient votes for funding"
    //     );

    //     // Transfer funds (voting tokens) from the contract to the proposal submitter
    //     ERC20Token votingToken = ERC20Token(votingTokenAddress);
    //     votingToken.transfer(
    //         proposals[_proposalId].submitter,
    //         proposals[_proposalId].votes
    //     );

    //     proposals[_proposalId].isVerified = true;
    // }
}
