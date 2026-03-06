# STORY-W3QA-41: Quality Metrics (Coverage, Flakiness, Defect Escapes)

## User Story
As a QA Lead, I want quality metrics (coverage, flakiness, defect escapes), so I can measure release risk.

## Context (Theory for Learners)
Metrics help avoid "we feel good" releases:
- automation pass rate is not enough
- flakiness can hide real regressions
- defect escapes reveal gaps in strategy

Web3-specific twist:
- track wallet-related failures separately
- track RPC reliability impact
- keep evidence artifacts (traces + tx hashes)

## Scope
- Define a practical metric set:
  - pass rate, flaky rate, quarantine rate
  - defect escape rate
  - mean time to detect / fix
  - wallet matrix coverage
- Provide thresholds and interpretation guidance

## Acceptance Criteria
1. Metrics are explained with examples (good vs bad).
2. Includes "how to collect" guidance (CI artifacts, test runner reports).
3. Includes a sample metrics dashboard spec (minimal).

## Done Criteria
- Learner can propose and defend metrics in a Lead QA interview.
