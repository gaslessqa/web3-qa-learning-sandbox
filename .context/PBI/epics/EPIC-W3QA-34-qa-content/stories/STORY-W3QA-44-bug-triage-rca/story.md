# STORY-W3QA-44: Bug Triage + RCA Playbook (Wallet/Chain/RPC)

## User Story
As a QA Lead, I want a bug triage + RCA playbook for wallet/chain/RPC issues, so defects are classified and fixed faster.

## Context (Theory for Learners)
Web3 bugs are often mis-triaged:
- "wallet bug" when it's a contract revert
- "chain bug" when it's a stale UI state
- "random flake" when it's RPC rate limiting

A good playbook standardizes:
- classification categories
- required evidence
- reproduction strategy (local chain, fork, testnet)
- severity and impact logic

## Scope
- Provide triage decision tree
- Provide RCA template
- Provide examples:
  - user rejected signature
  - unsupported network
  - RPC timeout
  - revert due to allowance
  - pending stuck

## Acceptance Criteria
1. Decision tree leads to reasonable classifications.
2. RCA template includes root cause, contributing factors, prevention actions.
3. Includes evidence requirements (screenshots, logs, tx hash, chainId, traces).

## Done Criteria
- Learner can triage Web3 bugs confidently and communicate root cause clearly.
