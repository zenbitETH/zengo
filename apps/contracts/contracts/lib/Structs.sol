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
        VerificationState verificationState;
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
        uint8 evidenceCount;
        uint256 proposalId;
        uint256 totalVotes;
        bool inProgress;
        VerificationState resultState;
    }

    struct Evidence {
        uint256 time;
        string evidenceDescription;
        string evidenceUri;
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
