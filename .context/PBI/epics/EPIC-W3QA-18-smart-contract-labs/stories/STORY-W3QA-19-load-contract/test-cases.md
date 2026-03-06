# Test Cases — STORY-W3QA-19: Load Practice Contract

## Manual Test Cases

### TC-W3QA-19-001 — Load preset contract (happy path)
**Steps**
1. Open Labs → Contract Interaction.
2. Select a preset practice contract from dropdown.
3. Click **Load Contract**.

**Expected**
- "Loaded" state appears
- Contract name/type + address + network shown
- Read/Write tabs become available

### TC-W3QA-19-002 — Invalid address validation (manual entry)
**Steps**
1. Enable "Manual address" mode (if present).
2. Enter an invalid address (e.g., `0x123`).
3. Click **Load**.

**Expected**
- Friendly validation error
- No console crash
- User can correct and retry

### TC-W3QA-19-003 — Unsupported network blocks loading
**Steps**
1. Switch wallet to an unsupported network.
2. Attempt to load any contract.

**Expected**
- UI shows "Unsupported network" state
- Load action is disabled
- Guidance to switch networks is visible

### TC-W3QA-19-004 — Retry after failure
**Steps**
1. Simulate failure (e.g., disconnect RPC / wrong chain / invalid address).
2. Fix the issue.
3. Retry load.

**Expected**
- Load succeeds without page refresh

## Automation Candidates (Playwright)
- Load preset contract (mocked registry) and assert loaded UI
- Address validation (invalid → error banner)
- Unsupported network UI (mock chainId)
