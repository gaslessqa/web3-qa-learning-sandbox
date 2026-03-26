// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title Counter
/// @notice A simple counter contract for QA practice.
///         Demonstrates state reads, state writes, access control, and events.
contract Counter {
    uint256 public count;
    address public owner;

    event Incremented(address indexed by, uint256 newCount);
    event Decremented(address indexed by, uint256 newCount);
    event Reset(address indexed by);

    error NotOwner();
    error AlreadyAtZero();

    constructor() {
        owner = msg.sender;
    }

    /// @notice Increments the counter by 1.
    function increment() external {
        count++;
        emit Incremented(msg.sender, count);
    }

    /// @notice Decrements the counter by 1. Reverts if already at zero.
    function decrement() external {
        if (count == 0) revert AlreadyAtZero();
        count--;
        emit Decremented(msg.sender, count);
    }

    /// @notice Resets the counter to 0. Only callable by the owner.
    function reset() external {
        if (msg.sender != owner) revert NotOwner();
        count = 0;
        emit Reset(msg.sender);
    }
}
