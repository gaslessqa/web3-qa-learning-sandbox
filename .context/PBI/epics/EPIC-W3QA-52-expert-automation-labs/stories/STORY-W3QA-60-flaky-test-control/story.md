# STORY-W3QA-60: Flaky Test Control (Retries, Quarantine, Tracing)

## User Story
As a QA Lead, I want a flaky-test management approach, so automation remains trustworthy over time.

## Context (Theory)
Flaky tests create "alert fatigue" and hide real regressions.
Web3 increases flakiness due to:
- wallet prompts
- async confirmations
- RPC variability
- UI timing changes

Flaky control needs:
- strict definition of flake
- quarantine process
- trace-based debugging
- limited retries with discipline

## Scope
- Define:
  - flaky test definition
  - retry policy (CI-only)
  - quarantine tagging mechanism
  - triage workflow and SLA
- Provide examples:
  - bad waits vs event-driven waits
  - stable selectors
  - timeouts strategy

## Acceptance Criteria
1. Clear policy exists (retries + quarantine + SLA).
2. Playwright config supports:
   - retries in CI only
   - trace on retry
   - consistent artifact naming
3. Documentation includes a practical triage checklist.

## Done Criteria
- Learners can keep automation stable in a real startup environment.
