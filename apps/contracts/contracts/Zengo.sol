// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";
import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./States.sol";
import "./Constants.sol";
import "./lib/Structs.sol";
import "./storage/ZengoStorage.sol";

contract ZengoDAO is
    Constants,
    ZengoStorage,
    GStates,
    PermissionsEnumerable,
    ContractMetadata
{
    IERC20 public token;

    event ModeratorsAdded(address[] indexed newModerators);
    event ModeratorRemoved(address indexed removedModerator);
    // nested mapping cannot be emitted in events
    // event ProposalSubmitted(Proposal newProposal, Evidence newEvidence);

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

    modifier onlyProposer(uint256 _proposalId) {
        require(
            proposals[GOVERNANCE_CYCLE][_proposalId].proposer == msg.sender,
            "Only proposer of this proposal can call this function"
        );
        _;
    }

    constructor(uint256 _pluralVotingPoints, address _tokenAddress) {
        owner = msg.sender;

        pluralVotingPoints = _pluralVotingPoints;
        token = IERC20(_tokenAddress);
        moderators[msg.sender] = true;
        moderatorList.push(msg.sender);
    }

    function updateModeratorInfo(
        address _moderatorAddress,
        uint8 _moderatorType,
        string memory _position,
        string memory _organization
    ) external onlyOwner {
        moderatorStruct[_moderatorAddress].moderatorType = Structs
            .ModeratorType(_moderatorType);
        moderatorStruct[_moderatorAddress].position = _position;
        moderatorStruct[_moderatorAddress].organization = _organization;
    }

    function addModerator(
        address _moderatorAddress,
        uint8 _moderatorType,
        string memory _position,
        string memory _organization
    ) external onlyOwner checkState(0) {
        require(
            moderators[_moderatorAddress] == false,
            "Address is already a Moderator"
        );
        moderators[_moderatorAddress] = true;
        moderatorList.push(_moderatorAddress);
        moderatorStruct[_moderatorAddress].moderatorType = Structs
            .ModeratorType(_moderatorType);
        moderatorStruct[_moderatorAddress].position = _position;
        moderatorStruct[_moderatorAddress].organization = _organization;
    }

    function addModerators(
        address[] memory _moderators
    ) external onlyOwner checkState(0) {
        for (uint256 i = 0; i < _moderators.length; i++) {
            if (moderators[_moderators[i]] == false) {
                moderatorList.push(_moderators[i]);
                moderators[_moderators[i]] = true;
            }
        }
        emit ModeratorsAdded(_moderators);
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
    // Done
    function submitProposal(
        string memory _title,
        string memory _proposalDescription,
        string memory _evidenceDescription,
        string memory _evidenceUri,
        string memory _proposalType,
        string memory _streetAddress,
        uint256 _proposalEvidenceTimestamp,
        uint256 _latitude,
        uint256 _longitude
    ) external checkState(1) {
        // require(
        //     votingPoints[msg.sender] > 0,
        //     "You need voting points to submit a proposal"
        // );

        // Evidence storage newEvidence = Evidence({

        // });

        Structs.Proposal storage newProposal = proposals[GOVERNANCE_CYCLE][
            proposalCount
        ];
        // Structs.Proposal storage newProposal =

        Structs.Evidence memory newEvidence = Structs.Evidence(
            _proposalEvidenceTimestamp,
            _evidenceDescription,
            _evidenceUri
        );

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
        newProposal.streetAddress = _streetAddress;
        newProposal.latitude = _latitude;
        newProposal.longitude = _longitude;
        proposalEvidence[GOVERNANCE_CYCLE][proposalCount] = newEvidence;

        intializeVotingIteration(proposalCount);

        // emit ProposalSubmitted(newProposal, newEvidence);

        // proposals[proposalCount] = newProposal;
        proposalCount++;
    }

    function setIndividualVotingPoints(
        address _voter,
        uint256 _points
    ) external onlyOwner {
        votingPoints[GOVERNANCE_CYCLE][_voter] = _points;
    }

    function setVotingPoints(uint256 _points) external onlyOwner {
        for (uint256 i = 0; i < moderatorList.length; i++) {
            votingPoints[GOVERNANCE_CYCLE][moderatorList[i]] = _points;
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

    function voteToClassifyProposal(
        uint8 _vote,
        uint8 _votingIteration,
        uint256 _proposalId
    ) external onlyModerator checkState(1) {
        require(
            _vote <= uint8(Structs.VerificationState.ApproveForFunding),
            "Out of Range / Invalid vote option"
        );

        require(
            !hasVoted[GOVERNANCE_CYCLE][_proposalId][_votingIteration][
                msg.sender
            ],
            "You have already voted for this Voting Iteration of this proposal"
        );
        vote[GOVERNANCE_CYCLE][_proposalId][_votingIteration][
            msg.sender
        ] = Structs.VerificationState(_vote);
        // votingIteration.vote[msg.sender] = Structs.VerificationState(_vote);
        hasVoted[GOVERNANCE_CYCLE][_proposalId][_votingIteration][
            msg.sender
        ] = true;
        // votingIteration.hasVoted[msg.sender] = true;
        voteCount[GOVERNANCE_CYCLE][_proposalId][_votingIteration][
            Structs.VerificationState(_vote)
        ]++;
        // votingIteration.voteCount[Structs.VerificationState(_vote)]++;
        // TODO: trigger concludeVotingIteration when one of the
        // consensusIteration reaches the threshold votesPercent
        // update addModerator flag here
        if (
            (voteCount[GOVERNANCE_CYCLE][_proposalId][_votingIteration][
                Structs.VerificationState(_vote)
            ] * 100) > moderatorList.length * THRESHOLD_VOTE_LIMIT
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
        if (
            _resultState == Structs.VerificationState(1) ||
            _resultState == Structs.VerificationState(2) ||
            _resultState == Structs.VerificationState(3)
        ) {
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .inProgress = true;
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .resultState = _resultState;
            // TODO: emit Event that proposal is now respective
            // verification state that can require further
            // voting iterations
            // TODO: trigger addVoteIteration with respective
            // Result State
        } else if (_resultState == Structs.VerificationState(4)) {
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .inProgress = false;
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .resultState = _resultState;
            proposals[GOVERNANCE_CYCLE][_proposalId]
                .isEligibleForFunding = false;
            proposals[GOVERNANCE_CYCLE][_proposalId].isVerified = true;
            // TODO: emit Event that proposal is completed and
            // doesn't require any funding
        } else if (_resultState == Structs.VerificationState(5)) {
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .inProgress = false;
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .resultState = _resultState;
            proposals[GOVERNANCE_CYCLE][_proposalId]
                .isEligibleForFunding = false;
            proposals[GOVERNANCE_CYCLE][_proposalId].isVerified = false;
            // TODO: emit Event that proposal is rejected or spam and
            // is ineligible for funding
        } else if (_resultState == Structs.VerificationState(6)) {
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .inProgress = false;
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .resultState = _resultState;
            proposals[GOVERNANCE_CYCLE][_proposalId]
                .isEligibleForFunding = true;
            proposals[GOVERNANCE_CYCLE][_proposalId].isVerified = true;
            // TODO: emit Event that proposal is approved for funding
        }
    }

    // Should this be callable by moderator?
    function concludeVotingIteration(
        uint8 _votingIteration,
        uint256 _proposalId
    ) external onlyModerator checkState(1) {
        // TODO: check zero Votes
        require(
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .inProgress,
            "Voting Iteration doesn't exist or has already concluded"
        );

        uint8 result = 0;
        uint256 maxCount = 0;
        // Have to handle Edge case when there are equal number of Votes
        for (uint8 i = 0; i < 6; i++) {
            if (
                voteCount[GOVERNANCE_CYCLE][_proposalId][_votingIteration][
                    Structs.VerificationState(i)
                ] > maxCount
            ) {
                result = i;
            }
        }
        if (result == 1 || result == 2 || result == 3) {
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .inProgress = true;
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .resultState = Structs.VerificationState(result);
            // TODO: emit Event that proposal is now respective
            // verification state that can require further
            // voting iterations
            // TODO: trigger addVoteIteration with respective
            // Result State
        } else if (result == 4) {
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .inProgress = false;
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .resultState = Structs.VerificationState(result);
            proposals[GOVERNANCE_CYCLE][_proposalId]
                .isEligibleForFunding = false;
            proposals[GOVERNANCE_CYCLE][_proposalId].isVerified = true;
            // TODO: emit Event that proposal is completed and
            // doesn't require any funding
        } else if (result == 5) {
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .inProgress = false;
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .resultState = Structs.VerificationState(result);
            proposals[GOVERNANCE_CYCLE][_proposalId]
                .isEligibleForFunding = false;
            proposals[GOVERNANCE_CYCLE][_proposalId].isVerified = false;
            // TODO: emit Event that proposal is rejected or spam and
            // is ineligible for funding
        } else if (result == 6) {
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .inProgress = false;
            voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
                .resultState = Structs.VerificationState(result);
            proposals[GOVERNANCE_CYCLE][_proposalId]
                .isEligibleForFunding = true;
            proposals[GOVERNANCE_CYCLE][_proposalId].isVerified = true;
            // TODO: emit Event that proposal is approved for funding
        }
    }

    function intializeVotingIteration(uint256 _proposalId) internal {
        voteIterations[GOVERNANCE_CYCLE][_proposalId].push();

        voteIterations[GOVERNANCE_CYCLE][_proposalId][0].votingIteration = 0;
        voteIterations[GOVERNANCE_CYCLE][_proposalId][0]
            .proposalId = _proposalId;
        voteIterations[GOVERNANCE_CYCLE][_proposalId][0].totalVotes = 0;
        voteIterations[GOVERNANCE_CYCLE][_proposalId][0].evidenceCount = 0;
        voteIterations[GOVERNANCE_CYCLE][_proposalId][0].inProgress = true;

        proposals[GOVERNANCE_CYCLE][_proposalId].votingIterationCount++;
        voteIterationsCount++;
    }

    function addVotingIteration(
        uint256 _proposalId
    ) public onlyModerator checkState(1) {
        uint8 currentVoteIteration = proposals[GOVERNANCE_CYCLE][_proposalId]
            .votingIterationCount;

        voteIterations[GOVERNANCE_CYCLE][_proposalId].push();

        voteIterations[GOVERNANCE_CYCLE][_proposalId][currentVoteIteration]
            .votingIteration = currentVoteIteration;
        voteIterations[GOVERNANCE_CYCLE][_proposalId][currentVoteIteration]
            .proposalId = _proposalId;
        voteIterations[GOVERNANCE_CYCLE][_proposalId][currentVoteIteration]
            .evidenceCount = 0;
        voteIterations[GOVERNANCE_CYCLE][_proposalId][currentVoteIteration]
            .totalVotes = 0;
        voteIterations[GOVERNANCE_CYCLE][_proposalId][currentVoteIteration]
            .inProgress = true;

        proposals[GOVERNANCE_CYCLE][_proposalId].votingIterationCount++;
        voteIterationsCount++;
    }

    //  TODO: Add function to add Evidence to Voting Iteration
    function addEvidence(
        uint256 _proposalId,
        uint256 _evidenceTimestamp,
        uint8 _votingIteration,
        string memory _evidenceDescription,
        string memory _evidenceUri
    ) public onlyProposer(_proposalId) {
        uint256 currentEvidenceIndex = votingIterationEvidence[
            GOVERNANCE_CYCLE
        ][_proposalId][_votingIteration].length;
        voteIterations[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
            .evidenceCount++;
        votingIterationEvidence[GOVERNANCE_CYCLE][_proposalId][_votingIteration]
            .push();
        votingIterationEvidence[GOVERNANCE_CYCLE][_proposalId][
            _votingIteration
        ][currentEvidenceIndex].evidenceDescription = _evidenceDescription;
        votingIterationEvidence[GOVERNANCE_CYCLE][_proposalId][
            _votingIteration
        ][currentEvidenceIndex].evidenceTimestamp = _evidenceTimestamp;
        votingIterationEvidence[GOVERNANCE_CYCLE][_proposalId][
            _votingIteration
        ][currentEvidenceIndex].evidenceUri = _evidenceUri;
        evidences++;
        // TODO: emit Evidence added event
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
