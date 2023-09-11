// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Constants {
    enum State {
        ModeratorRegistration,
        Verification,
        Voting,
        Funding,
        RewardsDistribution
    }

    // This array represents the end of each state
    // For example: Verification ends at the start of 42nd day
    // Thus stateLength are [1, 41, 15, 2, 1]
    // Thereby making the Governance Cycle 1+41+15+2+1=60 days long
    uint8[] STATE_COMPLETION_LENGTHS = [20, 42, 57, 59, 60];

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
