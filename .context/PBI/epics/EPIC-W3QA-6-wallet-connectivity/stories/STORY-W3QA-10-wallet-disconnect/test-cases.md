# Test Cases — STORY-W3QA-10: Wallet Disconnect

## Manual Test Cases

### TC-W3QA-10-001 — Disconnect resets UI
**Precondition:** Wallet connected.
**Steps**
1. Click **Disconnect**
2. Observe navbar and any wallet-dependent UI

**Expected**
- Connect CTA reappears
- Address/network removed
- No wallet-dependent actions remain enabled

### TC-W3QA-10-002 — Reconnect without refresh
**Steps**
1. Disconnect wallet
2. Click Connect Wallet again and approve

**Expected**
- Connection works without requiring page refresh

### TC-W3QA-10-003 — Cached state cleared
**Steps**
1. Connect wallet
2. Disconnect
3. Refresh the page

**Expected**
- UI remains disconnected (no "ghost" restore unless explicitly designed)

## Automation Candidates
- Mock provider:
  - simulate connected → disconnect and assert UI resets
- Synpress smoke:
  - connect MetaMask → disconnect → reconnect
