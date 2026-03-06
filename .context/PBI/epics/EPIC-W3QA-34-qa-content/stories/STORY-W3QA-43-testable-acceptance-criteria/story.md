# STORY-W3QA-43: Testable Acceptance Criteria for Web3 Features

## User Story
As a QA professional, I want examples of testable acceptance criteria for Web3 features, so requirements are verifiable and automation-friendly.

## Context (Theory for Learners)
Unclear requirements produce flaky tests and endless debates.
Web3 features need AC that specifies:
- wallet states (install/locked/reject)
- network preconditions (supported chainId)
- tx states (pending/confirmed/reverted)
- on-chain evidence (receipt/logs/explorer)

## Scope
- Provide AC examples for:
  - connect/disconnect wallet
  - network switching
  - write tx with gas estimation
  - revert handling UX
  - approvals/allowance flows
- Provide "anti-patterns" (bad AC) and improved versions

## Acceptance Criteria
1. Contains at least 10 strong AC examples and 5 anti-pattern rewrites.
2. Each example includes measurable outcomes and evidence requirements.
3. Includes "how to make it automatable" notes.

## Done Criteria
- Learner can write strong AC and collaborate effectively with PM/engineers.
