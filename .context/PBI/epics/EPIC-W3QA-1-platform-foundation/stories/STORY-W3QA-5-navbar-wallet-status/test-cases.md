# Test Cases — STORY-W3QA-5: Navbar Wallet Status

## Manual Test Cases

### TC-W3QA-5-001 — Disconnected state
**Steps**
1. Load platform in a fresh session.
2. Observe navbar.

**Expected**
- "Connect Wallet" CTA visible
- No address/network shown

### TC-W3QA-5-002 — Connected state (address + network)
**Precondition:** Wallet is connected.
**Steps**
1. Connect wallet.
2. Observe navbar.

**Expected**
- Truncated address is displayed
- Network name is displayed
- Badge indicates supported network state

### TC-W3QA-5-003 — Unsupported network indicator
**Steps**
1. Switch wallet to an unsupported network (e.g., a random chain not in supported list).
2. Observe navbar.

**Expected**
- Unsupported badge state is clearly visible
- Optional helper text suggests switching networks

## Automation Candidates (Playwright)
- In mock wallet mode:
  - Assert CTA for disconnected
  - Inject mocked account/chain and assert address + badge
