# Test Cases — STORY-W3QA-47: ERC-20 Approvals & Allowance Lab

## Manual Test Cases

### TC-W3QA-47-001 — Approve finite amount
**Steps**
1. Check current allowance (should be 0 initially).
2. Approve a small amount (e.g., 10 tokens).
3. Re-check allowance.

**Expected**
- Allowance updates to approved amount
- Tx lifecycle shows confirmed

### TC-W3QA-47-002 — Approve max allowance (warning)
**Steps**
1. Choose "Approve Max".
2. Approve in wallet.
3. Re-check allowance.

**Expected**
- Allowance becomes max
- UI explains what "max" means and mentions risks

### TC-W3QA-47-003 — TransferFrom consumes allowance
**Steps**
1. With allowance set, trigger "Spender uses allowance" action.
2. Re-check allowance.

**Expected**
- Allowance decreases accordingly (or becomes 0 if fully used)
- Balance changes reflect transfer

### TC-W3QA-47-004 — Revoke allowance
**Steps**
1. Click "Revoke" (approve 0).
2. Confirm tx.
3. Re-check allowance.

**Expected**
- Allowance is 0

### TC-W3QA-47-005 — Insufficient allowance error
**Steps**
1. Set allowance to a small value.
2. Attempt spender action exceeding allowance.

**Expected**
- Revert or failure shown
- Friendly explanation and fix (increase allowance)

## Automation Candidates
- Mock allowance/balance reads and assert formatting
- Local chain integration test: approve → transferFrom → revoke (can be deterministic)
