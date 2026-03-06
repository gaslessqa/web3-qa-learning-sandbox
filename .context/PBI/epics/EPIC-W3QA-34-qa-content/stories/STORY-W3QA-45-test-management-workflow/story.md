# STORY-W3QA-45: Test Management Workflow (Jira/TestRail/Linear)

## User Story
As a QA Lead, I want a test management workflow template (Jira/TestRail/Linear), so regressions and releases are traceable.

## Context (Theory for Learners)
Lead QA requires visibility:
- what is covered
- what is not covered
- what is blocked
- what changed since last release

Web3 adds:
- wallet matrix coverage
- on-chain evidence linking (tx hashes in tickets)
- flaky quarantine and CI artifacts

## Scope
- Provide workflow guidance for:
  - test case organization (smoke/regression, by module, by risk)
  - linking tests to requirements and releases
  - bug lifecycle and triage labels
  - release testing boards and reporting
- Provide example fields/tags usable in Jira/Linear/TestRail

## Acceptance Criteria
1. Includes a minimal working workflow that can be adopted quickly.
2. Includes recommended labels/components for Web3 (wallet, rpc, contract, chain).
3. Includes example report format for a release.

## Done Criteria
- Learner can set up a test management workflow aligned with Web3 needs.
