// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../Constants.sol";

interface IStates {
    function getState() external view returns (Constants.State);
    function getGovernanceCycle() external view returns (uint256);
}
