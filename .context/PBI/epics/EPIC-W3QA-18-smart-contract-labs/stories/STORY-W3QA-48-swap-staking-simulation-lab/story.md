# STORY-W3QA-48: Swap/Staking Simulation QA Lab (Slippage + Deadlines)

## User Story
As a learner, I want a swap/staking simulation lab (slippage + deadlines + revert scenarios), so I can practice realistic DeFi QA edge cases.

## Context (Theory for Learners)
DeFi swaps and staking flows commonly fail due to:
- **slippage** (price moves beyond tolerance)
- **deadline** expiry (tx mined too late)
- missing approvals / insufficient balances
- wrong token decimals
- unexpected reverts and confusing error messages

A QA engineer must test:
- correct parameter calculation
- correct user warnings
- correct handling of revert scenarios
- safe recovery (retry with adjusted settings)

## Scope
- Provide local practice contracts simulating:
  - a swap router with slippage + deadline checks
  - a staking contract with deposit/withdraw and rewards (simple)
- Guided lab flows:
  - approve token
  - simulate swap with slippage tolerance
  - force a slippage revert
  - force a deadline revert
  - stake/unstake and verify balances

## Acceptance Criteria
1. Learner can run a successful swap simulation on local chain.
2. Learner can trigger and observe:
   - slippage-too-low revert
   - deadline-expired revert
3. Learner can stake and unstake and validate on-chain state changes.
4. UI clearly explains why a failure happened and how to fix it.
5. The lab highlights QA checkpoints (inputs, expectations, on-chain receipt/logs).

## Dependencies
- ERC-20 approvals lab is recommended prerequisite (W3QA-47)
- Tx lifecycle UI (W3QA-23)
- Local chain environment with deterministic pricing rules

## Done Criteria
- Learner can test at least 4 realistic DeFi failure modes and explain the expected QA validations
