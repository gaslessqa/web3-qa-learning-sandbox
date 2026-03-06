# Test Cases — STORY-W3QA-30: Local Hardhat Node

## Manual Test Cases

### TC-W3QA-30-001 — Node starts successfully
**Steps**
1. Run the documented command to start the Hardhat node.

**Expected**
- Process starts without errors
- RPC URL is displayed (e.g., http://127.0.0.1:8545)

### TC-W3QA-30-002 — Accounts are listed
**Steps**
1. Observe node startup logs.

**Expected**
- Multiple accounts listed
- Each account shows a balance (funded)
- Private keys shown (local only)

### TC-W3QA-30-003 — Node restart resets state
**Steps**
1. Start node.
2. Stop node.
3. Start node again.

**Expected**
- Accounts and balances reset to initial defaults
- Chain state resets (unless persistence enabled)

## Automation Candidates
- Scripted health check:
  - JSON-RPC call to `eth_chainId` and `eth_blockNumber`
- CI: optional smoke that node starts and responds to RPC
