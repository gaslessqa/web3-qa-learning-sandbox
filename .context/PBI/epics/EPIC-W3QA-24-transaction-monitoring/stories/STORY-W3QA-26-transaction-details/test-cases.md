# Test Cases — STORY-W3QA-26: Transaction Details

## Manual Test Cases

### TC-W3QA-26-001 — Pending shows placeholders
**Steps**
1. Submit a tx and immediately open details.

**Expected**
- Hash visible
- Block/gasUsed/status show placeholders until mined

### TC-W3QA-26-002 — Confirmed shows full details
**Steps**
1. Wait for confirmation.
2. Open details view.

**Expected**
- Block number displayed
- Gas used displayed
- Status shows success

### TC-W3QA-26-003 — Reverted shows failure status
**Steps**
1. Submit a reverting tx.
2. Open details after mined.

**Expected**
- Status shows reverted/failure
- Gas used and block present

### TC-W3QA-26-004 — Responsive rendering
**Steps**
1. Repeat tests on mobile viewport.

**Expected**
- No overflow or broken layout

## Automation Candidates
- Mock a receipt and assert:
  - correct labels and formatting
  - placeholders in pending state
