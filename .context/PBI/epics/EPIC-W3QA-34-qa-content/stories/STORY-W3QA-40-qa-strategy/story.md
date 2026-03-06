# STORY-W3QA-40: Web3 QA Strategy (Test Pyramid + Quality Gates)

## User Story
As a QA Lead, I want a Web3 QA strategy (test pyramid + quality gates), so the team has clear standards and ownership.

## Context (Theory for Learners)
Lead QA is not only writing tests — it's deciding:
- what to automate, where, and why
- what quality metrics matter
- what blocks a release (quality gates)

Web3 adds constraints:
- wallet UI is volatile → keep E2E small and strategic
- on-chain outcomes require evidence → receipts/logs are first-class artifacts

## Scope
- Define a Web3 test pyramid:
  - unit (contracts + utilities)
  - integration (contract interactions, RPC, API)
  - UI (component + mocked provider)
  - E2E (small wallet + chain critical path)
- Define quality gates and release criteria
- Provide a sample strategy doc template

## Acceptance Criteria
1. Strategy includes clear layers and ownership.
2. Provides recommended automation scope (what not to automate too heavily).
3. Includes quality gates (CI thresholds, flaky policy, required suites).

## Done Criteria
- Learner can draft a QA strategy for a dApp and defend it in interviews.
