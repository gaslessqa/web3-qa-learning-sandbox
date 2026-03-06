# Test Cases — STORY-W3QA-21: Write Functions

## Manual Test Cases

### TC-W3QA-21-001 — Happy path: sign and submit tx
**Steps**
1. Connect wallet.
2. Load a practice contract.
3. Select a write function (valid params).
4. Click **Execute** and approve in wallet.

**Expected**
- UI shows "Awaiting signature…" then "Transaction submitted…"
- Tx hash displayed
- UI disables execute until status progresses

### TC-W3QA-21-002 — User rejects signature
**Steps**
1. Click **Execute**
2. Reject in wallet

**Expected**
- Friendly "Signature rejected" message
- No crash
- Execute becomes available again

### TC-W3QA-21-003 — Revert scenario
**Steps**
1. Execute a write function that is expected to revert (invalid input / business rule).
2. Approve in wallet.

**Expected**
- Tx ends as "Reverted"
- Revert reason displayed if available (human-readable)
- UI suggests checking inputs and retrying

### TC-W3QA-21-004 — Prevent double submission
**Steps**
1. Click Execute multiple times quickly.

**Expected**
- Only one signature request is triggered
- Button is disabled / debounced while pending

## Automation Candidates
- Mocked tx flow: simulate signature → hash → confirmed
- Synpress smoke (optional): approve a single write tx on local chain
