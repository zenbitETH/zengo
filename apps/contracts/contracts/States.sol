// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Constants.sol";

contract GStates is Constants {

    uint256 public startTime;

    constructor () payable {
        startTime = block.timestamp;
    }

    modifier checkState(uint8 _state) {
        require(State(_state) == getState(), "incorrect state");
        _;
    }

    function getState () public view returns (State) {
       
        uint256 _governanceCycle = calculateCurrentGovernanceCycle();

        uint256 day = (block.timestamp - startTime - (_governanceCycle * GOVERNANCE_CYCLE_LENGTH)) / 86400;

        if (day < STATE_COMPLETION_LENGTHS[0]) {
            return State(0);
        } else if (day >= STATE_COMPLETION_LENGTHS[0] && day < STATE_COMPLETION_LENGTHS[1]) {
            return State(1);
        } else if (day >= STATE_COMPLETION_LENGTHS[1] && day < STATE_COMPLETION_LENGTHS[2]) {
            return State(2);
        } else if (day >= STATE_COMPLETION_LENGTHS[2] && day < STATE_COMPLETION_LENGTHS[3]) {
            return State(3);
        } else {
            return State(4);
        }

    }

    function getGovernanceCycle() public view returns (uint256) {
        return calculateCurrentGovernanceCycle();
    }

    function calculateCurrentGovernanceCycle() internal view returns (uint256) {
        return ((block.timestamp - startTime) / GOVERNANCE_CYCLE_LENGTH);
    }
}