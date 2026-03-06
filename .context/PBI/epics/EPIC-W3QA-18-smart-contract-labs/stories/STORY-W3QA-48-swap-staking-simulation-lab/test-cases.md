# Test Cases — STORY-W3QA-48: Swap/Staking Simulation Lab

## Manual Test Cases

### TC-W3QA-48-001 — Successful swap
**Steps**
1. Approve token spending (if required).
2. Set slippage to a safe value (e.g., 1%).
3. Set deadline sufficiently in the future.
4. Execute swap.

**Expected**
- Tx confirmed
- Output token balance increases
- Logs/events visible (if emitted)

### TC-W3QA-48-002 — Slippage revert
**Steps**
1. Set slippage tolerance too low (e.g., 0.01%).
2. Execute swap.

**Expected**
- Tx reverts with "slippage" style reason
- UI explains: increase slippage tolerance or reduce trade size

### TC-W3QA-48-003 — Deadline expired revert
**Steps**
1. Set deadline in the past (or near-now) so it expires.
2. Execute swap.

**Expected**
- Tx reverts with "deadline expired" reason
- UI explains: extend deadline

### TC-W3QA-48-004 — Missing approval / insufficient allowance
**Steps**
1. Revoke allowance.
2. Attempt swap.

**Expected**
- Revert or failure shown
- UI instructs to approve token first

### TC-W3QA-48-005 — Staking deposit/withdraw lifecycle
**Steps**
1. Deposit stake.
2. Verify staked balance increased.
3. Withdraw stake.
4. Verify staked balance decreased and wallet balance returns.

**Expected**
- Read state matches expected after each step

## Automation Candidates
- Deterministic local chain tests:
  - swap success
  - slippage revert
  - deadline revert
  - stake/unstake state assertions
- UI automation can mock contract calls for stable CI smoke
