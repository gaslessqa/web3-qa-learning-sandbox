# Test Cases — STORY-W3QA-9: Address Display

## Manual Test Cases

### TC-W3QA-9-001 — Truncation format
**Precondition:** Wallet connected.
**Steps**
1. Connect wallet.
2. Observe address in navbar.

**Expected**
- Address is truncated consistently (e.g., 0x1234...abcd)
- No overflow / wrapping issues on mobile

### TC-W3QA-9-002 — Disconnected state
**Steps**
1. Disconnect wallet.
2. Observe navbar.

**Expected**
- Address is not displayed
- CTA is visible instead

### TC-W3QA-9-003 — Account change updates UI
**Steps**
1. Connect wallet.
2. Switch account inside the wallet (accounts dropdown in MetaMask).
3. Observe navbar.

**Expected**
- Address updates to the new account
- No stale address remains

## Automation Candidates (Playwright)
- In mock wallet mode:
  - inject account and assert formatted text
  - change injected account and assert UI updates
