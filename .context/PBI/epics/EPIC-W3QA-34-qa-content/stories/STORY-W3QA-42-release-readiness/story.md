# STORY-W3QA-42: Release Readiness Checklist for dApps

## User Story
As a QA Lead, I want a release readiness checklist for dApps, so releases follow consistent Go/No-Go criteria.

## Context (Theory for Learners)
Release readiness is about risk control:
- do we trust the build?
- did we validate critical paths?
- are known issues acceptable?

Web3 critical paths often include:
- wallet connect/reject states
- network switching and unsupported chain
- tx lifecycle and revert handling
- approvals/allowance (DeFi patterns)
- RPC degradation behavior

## Scope
- Provide a Go/No-Go checklist with:
  - required suites
  - smoke/regression gating
  - wallet matrix minimum set
  - performance budget checks
  - security sanity checks (non-audit)

## Acceptance Criteria
1. Checklist is actionable and can be used for real releases.
2. Includes "minimum required evidence" (reports, traces, tx hashes if applicable).
3. Includes "exceptions process" (what happens if a check fails).

## Done Criteria
- Learner can run a release readiness review and document the decision.
