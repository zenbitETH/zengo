// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library Structs {
    struct Proposal {
        uint8 votingIterationCount;
        uint256 proposalId;
        string title;
        string proposalDescription;
        string proposalType;
        address proposer;
        // Evidence proposalEvidence;
        // Vote[] votingIterations;
        VerificationState verificationState;
        // requires funding
        bool isEligibleForFunding;
        bool isVerified;
    }
    struct Moderator {
        ModeratorType moderatorType;
        string position;
        string organization;
    }

    struct Vote {
        uint8 votingIteration;
        uint256 proposalId;
        uint256 totalVotes;
        bool inProgress;
        mapping(address => VerificationState) vote;
        mapping(address => bool) hasVoted;
        mapping(VerificationState => uint256) voteCount;
        VerificationState resultState;
        // Evidence[] evidences;
    }

    struct Evidence {
        string evidenceDescription;
        string streetAddress;
        string evidenceUri;
        uint256 latitude;
        uint256 longitude;
    }

    enum VerificationState {
        ProposalRegistered,
        MunicipalVerification,
        StateVerification,
        FederalVerification,
        SolvedNoFundingRequired,
        RejectProposal,
        ApproveForFunding
    }

    enum ModeratorType {
        CivilOrganization,
        PrivateSector,
        Academy,
        Government,
        OpenForAll
    }
}