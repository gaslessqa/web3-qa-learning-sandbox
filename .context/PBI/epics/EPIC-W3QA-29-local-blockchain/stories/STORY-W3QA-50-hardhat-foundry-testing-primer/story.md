# STORY-W3QA-50: Hardhat/Foundry Testing Primer (for QA)

## User Story
As a learner, I want a Hardhat/Foundry testing primer (for QA) so that I can collaborate with engineers and validate integrations.

## Context (Theory for Learners)
Even if you are not writing smart contracts, QA in Web3 benefits from understanding how engineers test contracts:
- unit vs integration tests
- fixtures and deterministic setup
- revert reasons and event assertions
- traces and debugging tools

This primer focuses on what a QA engineer needs:
- reading tests
- adding integration assertions
- understanding failures and logs

## Scope
- A short guide explaining:
  - Hardhat test structure (TypeScript)
  - Foundry basics (if included): how tests look, common commands
  - how to assert events and revert reasons
  - how to run tests locally and in CI
- Provide minimal example tests using the practice contracts:
  - one success case
  - one revert case
  - one event assertion

## Acceptance Criteria
1. Guide includes a minimal Hardhat test example for practice contracts.
2. Guide explains revert reasons and how to assert them.
3. Guide explains event assertions and how they relate to QA verification.
4. Optional Foundry section is clearly labeled and includes basic commands.
5. Learner can run tests locally following the guide.

## Out of Scope
- Advanced Solidity patterns and deep security auditing
- Building a full contract test suite as a product

## Dependencies
- Practice contracts deployed/available
- Hardhat test runner set up
- Optional Foundry setup (if adopted)

## Done Criteria
- Learner understands how contract tests work and can communicate effectively with smart contract developers
