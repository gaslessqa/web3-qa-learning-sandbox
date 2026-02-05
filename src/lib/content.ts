import { cache } from "react";

export interface LessonContent {
  slug: string;
  content: string;
}

// Content map - maps content_path to actual content
// In production, this could be loaded from MDX files or a CMS
const contentMap: Record<string, string> = {
  "beginner/intro-to-blockchain-testing": `
# Introduction to Blockchain Testing

Welcome to your first lesson in Web3 QA! In this lesson, you'll learn why blockchain applications require specialized testing approaches.

## Why is Blockchain Testing Different?

Traditional web applications operate on centralized servers where bugs can be fixed with a simple deployment. Blockchain applications are fundamentally different:

### 1. Immutability
Once a smart contract is deployed, **it cannot be changed**. Any bug in the code becomes permanent unless you've built in upgrade mechanisms.

### 2. Financial Risk
Smart contracts often handle real money. A single vulnerability can lead to millions of dollars in losses.

> **Real Example**: The DAO hack in 2016 resulted in $60 million stolen due to a reentrancy vulnerability.

### 3. Gas Costs
Every operation costs money (gas). Inefficient code means users pay more for transactions.

### 4. Deterministic Execution
Smart contracts must produce the same output given the same input, every time, on every node in the network.

## Key Testing Areas

| Area | What to Test |
|------|--------------|
| **Security** | Reentrancy, overflow, access control |
| **Functionality** | Business logic, state transitions |
| **Gas Efficiency** | Optimization, batch operations |
| **Edge Cases** | Boundary conditions, empty states |

## Testing Tools Overview

- **Foundry** - Fast, Rust-based testing framework
- **Hardhat** - JavaScript/TypeScript testing environment
- **Slither** - Static analysis for security
- **Echidna** - Fuzzing tool for finding edge cases

## Summary

In this lesson, you learned why blockchain testing is different and the key areas to focus on.
`,

  "beginner/testing-tools-overview": `
# Testing Tools Overview

In this lesson, you'll explore the landscape of Web3 testing tools.

## The Testing Toolbox

### 1. Foundry
Foundry is a blazing-fast, portable toolkit for Ethereum development.

**Key Features:**
- Written in Rust for maximum speed
- Tests written in Solidity
- Built-in fuzzing
- Gas snapshots and reports

### 2. Hardhat
Hardhat is a JavaScript-based development environment with excellent debugging.

**Key Features:**
- TypeScript support
- Console.log in Solidity
- Extensive plugin ecosystem
- Network forking

### Comparison Table

| Feature | Foundry | Hardhat |
|---------|---------|---------|
| Language | Solidity | JavaScript/TS |
| Speed | Very Fast | Moderate |
| Fuzzing | Built-in | Plugin needed |

## Security Analysis Tools

### Slither (Static Analysis)
Detects vulnerabilities without running code.

### Mythril (Symbolic Execution)
Explores all possible execution paths.

## Summary

You learned about Foundry, Hardhat, Slither, and Mythril - the essential Web3 testing tools.
`,

  "beginner/your-first-test": `
# Writing Your First Test

Time to get hands-on! In this lesson, you'll write your first smart contract test using Foundry.

## Prerequisites

Make sure you have Foundry installed:
\`\`\`bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
\`\`\`

## Step 1: Create the Project

\`\`\`bash
forge init my-first-test
cd my-first-test
\`\`\`

## Step 2: Write a Simple Contract

\`\`\`solidity
// src/Counter.sol
pragma solidity ^0.8.19;

contract Counter {
    uint256 public count;

    function increment() public {
        count += 1;
    }

    function decrement() public {
        require(count > 0, "Count cannot go below zero");
        count -= 1;
    }
}
\`\`\`

## Step 3: Write Your First Test

\`\`\`solidity
// test/Counter.t.sol
import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
    }

    function test_Increment() public {
        counter.increment();
        assertEq(counter.count(), 1);
    }

    function test_RevertWhen_DecrementBelowZero() public {
        vm.expectRevert("Count cannot go below zero");
        counter.decrement();
    }
}
\`\`\`

## Step 4: Run the Tests

\`\`\`bash
forge test -vv
\`\`\`

## Summary

Congratulations! You've written your first smart contract tests using Foundry!
`,
};

// Get lesson content by path
export const getContent = cache(async (contentPath: string): Promise<string | null> => {
  return contentMap[contentPath] || null;
});

// Check if content exists
export const hasContent = (contentPath: string): boolean => {
  return contentPath in contentMap;
};
