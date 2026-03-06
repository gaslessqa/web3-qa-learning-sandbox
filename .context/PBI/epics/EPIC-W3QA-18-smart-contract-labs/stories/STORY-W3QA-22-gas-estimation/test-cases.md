# Test Cases — STORY-W3QA-22: Gas Estimation

## Manual Test Cases

### TC-W3QA-22-001 — Estimation displayed for valid inputs
**Steps**
1. Load practice contract.
2. Select a write function.
3. Enter valid params.

**Expected**
- Gas estimate appears (units + cost if available)
- Loading state appears briefly then resolves

### TC-W3QA-22-002 — Estimation updates on input change
**Steps**
1. Change one parameter value.
2. Observe estimation.

**Expected**
- Estimation refreshes (new value or re-simulation)
- UI does not freeze

### TC-W3QA-22-003 — Estimation failure handled (would revert)
**Steps**
1. Enter inputs that cause the function to revert.
2. Observe estimation.

**Expected**
- Friendly error ("Estimation failed — transaction would revert")
- Guidance shown (fix inputs / check allowance / etc.)

### TC-W3QA-22-004 — Local chain behavior
**Steps**
1. Run on local Hardhat chain.
2. Repeat estimation tests.

**Expected**
- Estimation works and displays values
- UI labels local chain context if needed

## Automation Candidates
- Mock simulation results (success/failure) and assert UI states
- Snapshot test for estimation component formatting
