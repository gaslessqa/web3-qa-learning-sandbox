# Test Cases — STORY-W3QA-33: Funded Test Accounts

## Manual Test Cases

### TC-W3QA-33-001 — Accounts are pre-funded
**Steps**
1. Start node and observe accounts list.

**Expected**
- Each account shows a balance greater than zero

### TC-W3QA-33-002 — Import local key into MetaMask
**Steps**
1. Copy a private key from node logs.
2. Import into MetaMask (test-only environment).
3. Connect MetaMask to local chain and to the app.

**Expected**
- Imported account appears
- Balance is visible
- App displays connected address

### TC-W3QA-33-003 — Execute a lab transaction successfully
**Steps**
1. Run a write function in the lab.
2. Approve transaction.

**Expected**
- Transaction confirms
- Balance decreases slightly (gas used)
- Tx lifecycle UI shows confirmed

## Automation Candidates
- Minimal local integration test:
  - verify `eth_getBalance` for default accounts > 0
