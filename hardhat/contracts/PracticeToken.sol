// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title PracticeToken
/// @notice A mintable ERC-20 token for QA practice.
///         Anyone can call mint() to get free tokens.
///         Demonstrates balanceOf, transfer, approve, transferFrom flows.
contract PracticeToken {
    string public name = "Practice Token";
    string public symbol = "PRAC";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    uint256 public constant MINT_AMOUNT = 1_000 * 10 ** 18; // 1,000 PRAC per mint

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    error InsufficientBalance();
    error InsufficientAllowance();

    /// @notice Mints 1,000 PRAC to the caller. No restrictions.
    function mint() external {
        balanceOf[msg.sender] += MINT_AMOUNT;
        totalSupply += MINT_AMOUNT;
        emit Transfer(address(0), msg.sender, MINT_AMOUNT);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        if (balanceOf[msg.sender] < amount) revert InsufficientBalance();
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        if (balanceOf[from] < amount) revert InsufficientBalance();
        if (allowance[from][msg.sender] < amount) revert InsufficientAllowance();
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
}
