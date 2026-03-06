# Test Cases — STORY-W3QA-65: WalletConnect Real Device Testing

## Manual Test Cases

### TC-W3QA-65-001 — Happy path pairing (QR)
**Steps**
1. On desktop, click Connect Wallet → WalletConnect.
2. QR code appears.
3. On mobile wallet app, scan QR.
4. Approve connection on the phone.
5. Return focus to desktop browser.

**Expected**
- Desktop dApp shows connected state (address + network)
- No crashes or infinite "waiting" state

### TC-W3QA-65-002 — Timeout (no scan)
**Steps**
1. Start WalletConnect pairing.
2. Do not scan QR; wait for timeout.

**Expected**
- Desktop shows "Timed out" message
- Retry is possible without refresh

### TC-W3QA-65-003 — User rejects on mobile wallet
**Steps**
1. Start pairing, scan QR.
2. Reject/cancel in the mobile wallet.

**Expected**
- Desktop shows "Connection cancelled" style message
- UI returns to safe state

### TC-W3QA-65-004 — Refresh behavior
**Steps**
1. Pair successfully.
2. Refresh the desktop page.

**Expected**
- Behavior matches design:
  - either reconnect automatically if session persists
  - or show disconnected state with a clear reconnect path
- No "ghost connected" inconsistent state

### TC-W3QA-65-005 — Disconnect from dApp
**Steps**
1. While connected, click Disconnect in the dApp.

**Expected**
- Desktop returns to disconnected UI
- Wallet session may still exist (depends on wallet)—lesson explains expected variance

### TC-W3QA-65-006 — Disconnect/revoke from wallet side
**Steps**
1. With a connected session, open wallet app session management.
2. Disconnect/revoke the session.
3. Return to desktop and interact with the dApp.

**Expected**
- dApp detects disconnect and returns to safe state
- Clear messaging indicates the session ended

### TC-W3QA-65-007 — Unsupported network on mobile wallet
**Steps**
1. Switch mobile wallet to an unsupported network (or keep it unsupported).
2. Try pairing/using the dApp.

**Expected**
- dApp shows unsupported network warning and guidance to switch
- No silent failures

## Automation Candidates (Guidance)
- Keep WalletConnect real-device flows manual.
- For CI, use mocked WalletConnect provider states to validate UI behavior:
  - pending approval
  - connected
  - timeout
  - disconnected
