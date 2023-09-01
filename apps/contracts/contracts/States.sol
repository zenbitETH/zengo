// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Constants {
    enum State {
        Verification,
        Voting,
        Funding,
        RewardsDistribution
    }

    // Each state by days
    // [42, 15, 2, 1]
    uint8 [] STATE_LENGTHS = [42, 57, 59, 60];

    enum VerificationState {
        ProposalRegistered,
        MunicipalVerification,
        StateVerification,
        FederalVerification,
        SolvedNoFundingRequired,
        RejectProposal,
        ApproveForFunding
    }

    uint256 public GOVERNANCE_CYCLE = 0;

    uint256 public constant THRESHOLD_VOTE_LIMIT = 51;

    // Length of a full governance cycle in seconds
    // 60 days = 60 * 24 * 60 * 60
    uint256 public constant GOVERNANCE_CYCLE_LENGTH = 5184000;

}