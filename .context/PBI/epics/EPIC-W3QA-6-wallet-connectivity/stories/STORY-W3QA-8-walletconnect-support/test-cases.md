# Test Cases — STORY-W3QA-8: WalletConnect Support

## Manual Test Cases

### TC-W3QA-8-001 — Happy path (QR pairing)
**Steps**
1. Click **Connect Wallet**
2. Select **WalletConnect**
3. Scan QR with a mobile wallet
4. Approve connection in the mobile wallet

**Expected**
- App enters connected state
- Address becomes available in UI
- No console errors

### TC-W3QA-8-002 — Timeout
**Steps**
1. Start WalletConnect pairing
2. Do not scan QR, wait until timeout

**Expected**
- User sees a timeout message
- Retry is possible without refreshing

### TC-W3QA-8-003 — User cancels from mobile wallet
**Steps**
1. Start pairing
2. Scan QR
3. Cancel on mobile wallet

**Expected**
- Clear "Connection cancelled" style message
- UI returns to safe state

### TC-W3QA-8-004 — Slow network
**Steps**
1. Throttle network in DevTools
2. Start pairing

**Expected**
- Loading indicator has context ("Waiting for approval…")
- No infinite loader without status text

## Automation Candidates
- WalletConnect true automation is harder (needs mobile device).
- For CI:
  - mock WalletConnect provider responses and assert UI states
  - keep real WC tests as manual or device lab (post-MVP)
