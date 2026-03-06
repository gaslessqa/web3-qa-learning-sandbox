# STORY-W3QA-49: Mainnet Forking Guide (Reproducible Bug Reports)

## User Story
As a learner, I want a mainnet-fork environment guide so that I can reproduce real-world dApp issues deterministically.

## Context (Theory for Learners)
Forking creates a local chain that mirrors a real network's state at a specific block:
- you can reproduce bugs with real contract state and balances
- you can debug without spending real funds
- you can share a "block number + steps" with engineers for deterministic reproduction

For QA leads, this is a powerful technique for high-quality bug reports.

## Scope
- Documentation and scripts for running a forked local node
- Guidance for:
  - choosing a block number
  - setting RPC provider key (Alchemy/Infura/etc.)
  - running labs against fork
- Troubleshooting for common fork failures (rate limits, missing archive data)

## Acceptance Criteria
1. A documented command starts a forked node at a chosen block number.
2. Learner understands and can explain:
   - why block pinning matters
   - what can vary when block not pinned
3. Guide includes common failure modes and fixes (RPC limits, timeouts).
4. Clear warnings about never using real keys/funds in unsafe ways.

## Out of Scope
- Automated fork environment provisioning for teams
- Full Tenderly integration (future)

## Dependencies
- Hardhat fork configuration capability
- RPC provider credentials (user-provided)

## Done Criteria
- Learner can run a forked node and interact with known mainnet contracts in read-only mode (and optionally write in fork) safely
