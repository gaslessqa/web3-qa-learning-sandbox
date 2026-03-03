# Test Cases — STORY-W3QA-4: Wallet State Persistence

## Manual Test Cases

### TC-W3QA-4-001 — Persist across navigation
**Precondition:** Wallet is connected.
**Steps**
1. Connect wallet.
2. Navigate Docs → Labs → Home.
3. Observe navbar.

**Expected**
- Wallet remains connected throughout
- No reconnection prompts

### TC-W3QA-4-002 — Clear on browser close (session-only)
**Steps**
1. Connect wallet.
2. Close the browser.
3. Reopen and load the platform.

**Expected**
- Session does not automatically restore connection (unless explicitly designed otherwise)

## Automation Candidates (Playwright + Wallet Automation)
- Best covered in wallet epic E2E (Synpress).
- For MVP: keep a mock-provider mode to assert UI state persistence without real extension.
