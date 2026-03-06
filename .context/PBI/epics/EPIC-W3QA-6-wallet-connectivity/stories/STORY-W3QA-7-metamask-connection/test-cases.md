# Test Cases — STORY-W3QA-7: MetaMask Connection

## Manual Test Cases

### TC-W3QA-7-001 — Happy path (approve)
**Steps**
1. Click **Connect Wallet**
2. Select **MetaMask**
3. Click **Approve** in MetaMask

**Expected**
- Connected state is visible (CTA replaced by connected UI)
- Address is available to UI (navbar will display in W3QA-9)
- No console errors

### TC-W3QA-7-002 — User rejects/cancels
**Steps**
1. Click **Connect Wallet**
2. Select **MetaMask**
3. Click **Cancel/Reject** in MetaMask

**Expected**
- User sees a friendly message (e.g., "Connection cancelled")
- UI remains usable (no crash, no infinite loading)
- Connect button remains available for retry

### TC-W3QA-7-003 — MetaMask not installed
**Steps**
1. Use a clean browser profile without MetaMask
2. Click **Connect Wallet**

**Expected**
- MetaMask option is hidden or disabled
- Install CTA is shown (link or guidance)

### TC-W3QA-7-004 — MetaMask locked
**Steps**
1. Lock MetaMask
2. Click **Connect Wallet** → select **MetaMask**
3. Attempt approval flow

**Expected**
- Clear guidance to unlock MetaMask
- Retry possible after unlock

### TC-W3QA-7-005 — Popup blocked
**Steps**
1. Block popups for the site (browser settings)
2. Try connecting MetaMask

**Expected**
- Guidance appears (enable popups / allow extension prompts)
- No crash

## Automation Candidates

### Stable (Playwright, mocked provider)
- Assert connect CTA visible
- Assert wallet modal opens
- Assert user-friendly error banner on simulated rejection

### True E2E (Playwright + Synpress)
- Approve connection in MetaMask
- Assert UI reaches connected state
**Note:** keep E2E suite minimal (smoke) due to wallet UI volatility.
