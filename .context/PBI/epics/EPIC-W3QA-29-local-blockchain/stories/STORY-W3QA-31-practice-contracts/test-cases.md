# Test Cases — STORY-W3QA-31: Pre-deployed Practice Contracts

## Manual Test Cases

### TC-W3QA-31-001 — Deploy script succeeds
**Steps**
1. Start local node.
2. Run deploy script.

**Expected**
- Script completes without errors
- Outputs deployed addresses

### TC-W3QA-31-002 — Registry generated
**Steps**
1. After deploy, locate the generated registry used by the app.

**Expected**
- Registry contains contract entries with name/address/chainId
- ABI references are valid

### TC-W3QA-31-003 — Contracts behave as expected
**Steps**
1. Load a contract in the Labs UI (W3QA-19).
2. Call a read function.
3. Execute a write function (success case).
4. Execute a write function that is expected to revert.

**Expected**
- Reads return expected values
- Success tx confirms
- Revert tx shows reverted state + reason (if available)

## Automation Candidates
- Hardhat task test:
  - run deploy in a test environment
  - assert registry JSON schema and presence of required contracts
