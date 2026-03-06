# Test Cases — STORY-W3QA-20: Read Functions

## Manual Test Cases

### TC-W3QA-20-001 — Call read function without params
**Steps**
1. Load a practice contract.
2. Select a read function with no parameters.
3. Click **Call**.

**Expected**
- Loading indicator appears
- Result is displayed clearly

### TC-W3QA-20-002 — Call read function with params
**Steps**
1. Select a read function that requires parameters.
2. Enter valid parameters.
3. Click **Call**.

**Expected**
- Result matches expected contract state
- Parameter inputs are type-labeled

### TC-W3QA-20-003 — Invalid parameter shows friendly error
**Steps**
1. Enter an invalid parameter type (e.g., non-address string for address param).
2. Click **Call**.

**Expected**
- Validation error shown before sending call OR friendly error after failure
- UI remains usable and user can correct

### TC-W3QA-20-004 — RPC failure handling
**Steps**
1. Disconnect or throttle RPC.
2. Call a read function.

**Expected**
- Error is shown (retry possible)
- No crash / infinite loading

## Automation Candidates (Playwright)
- Mock read call results and assert rendering
- Parameter validation tests (input → error)
- Loading state snapshot/visibility
