# Test Cases — STORY-W3QA-23: Transaction Lifecycle

## Manual Test Cases

### TC-W3QA-23-001 — Pending → Confirmed
**Steps**
1. Execute a write function (approve signature).
2. Observe transaction status UI.

**Expected**
- Pending state appears immediately after submission
- Confirmed state appears after mining
- Receipt details displayed

### TC-W3QA-23-002 — Pending → Reverted
**Steps**
1. Execute a write function that will revert.
2. Observe lifecycle UI.

**Expected**
- Reverted state displayed
- Revert reason shown if available
- Guidance to adjust inputs

### TC-W3QA-23-003 — Long pending guidance
**Steps**
1. Simulate slow mining (or throttle/pause local mining if supported).
2. Observe pending UI for >30 seconds.

**Expected**
- UI remains responsive
- Helpful text appears (e.g., "Still pending… you can wait or retry later")

### TC-W3QA-23-004 — Explorer link presence (non-local network)
**Steps**
1. Run on a supported testnet (optional).
2. Submit tx and inspect details.

**Expected**
- Explorer link is present and correct for the network

## Automation Candidates
- Mock receipt polling and assert state transitions
- Unit tests for receipt formatting
- Minimal Synpress E2E smoke: submit 1 tx on local chain and assert confirmed UI
