# Test Cases — STORY-W3QA-25: Real-time Tx Status

## Manual Test Cases

### TC-W3QA-25-001 — Submitted → Pending → Confirmed
**Steps**
1. Submit a transaction (approve in wallet).
2. Observe status panel.

**Expected**
- Status appears immediately (Submitted/Pending)
- Updates to Confirmed after mining
- No UI freeze

### TC-W3QA-25-002 — Submitted → Pending → Reverted
**Steps**
1. Submit a transaction expected to revert.
2. Observe status panel.

**Expected**
- Reverted state shown
- UI remains usable and offers guidance

### TC-W3QA-25-003 — Long pending messaging
**Steps**
1. Simulate slow mining (or heavy throttling).
2. Keep the status panel open > 30 seconds.

**Expected**
- Helpful text appears ("Still pending…")
- UI remains responsive

### TC-W3QA-25-004 — RPC failure during polling
**Steps**
1. Submit tx
2. Temporarily break RPC access
3. Observe status panel

**Expected**
- Recoverable error shown (Retry)
- No crash, no infinite spinner

## Automation Candidates
- Mock receipt polling states:
  - pending → confirmed
  - pending → reverted
  - polling error → retry success
