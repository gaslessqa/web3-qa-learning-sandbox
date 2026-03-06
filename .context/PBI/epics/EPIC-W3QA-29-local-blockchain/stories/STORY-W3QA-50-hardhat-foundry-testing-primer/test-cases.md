# Test Cases — STORY-W3QA-50: Hardhat/Foundry Testing Primer

## Manual Test Cases

### TC-W3QA-50-001 — Hardhat test runs successfully
**Steps**
1. Follow the primer steps.
2. Run `test` command.

**Expected**
- Tests execute successfully
- Output indicates pass

### TC-W3QA-50-002 — Revert assertion example works
**Steps**
1. Run the provided revert test.

**Expected**
- Test passes and confirms revert reason (or revert occurrence)

### TC-W3QA-50-003 — Event assertion example works
**Steps**
1. Run the event assertion test.

**Expected**
- Test passes and confirms event emission

## Automation Candidates
- CI can run Hardhat tests as part of pipeline
- Optional: separate job for Foundry tests if adopted
