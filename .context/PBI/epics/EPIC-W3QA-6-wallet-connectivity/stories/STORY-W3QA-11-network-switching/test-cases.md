# Test Cases — STORY-W3QA-11: Network Switching

## Manual Test Cases

### TC-W3QA-11-001 — Display current network
**Steps**
1. Open platform
2. Connect wallet (optional if UI shows network only when connected)
3. Observe network label/badge

**Expected**
- Current network name is displayed accurately

### TC-W3QA-11-002 — Switch to supported network (approve)
**Precondition:** Wallet connected.
**Steps**
1. Open network selector
2. Select a supported network
3. Approve network switch in wallet

**Expected**
- Network badge updates to selected network
- No stale chainId remains
- Labs/components reflect new network context

### TC-W3QA-11-003 — User rejects network switch
**Steps**
1. Attempt switching network
2. Reject in wallet prompt

**Expected**
- Friendly "Network switch cancelled" message
- Network remains unchanged
- UI remains usable

### TC-W3QA-11-004 — Unsupported network warning
**Steps**
1. Switch wallet manually to an unsupported chain
2. Return to platform

**Expected**
- Warning badge visible
- Guidance provided (select a supported network)

## Automation Candidates
- Mock provider: simulate chainId changes and assert UI badge updates.
- Synpress smoke: connect MetaMask and approve switching for one supported chain.
