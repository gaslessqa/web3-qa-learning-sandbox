# Wallet Disconnect

**Jira Key:** W3QA-10
**Epic:** EPIC-W3QA-6 (Wallet Connectivity)
**Priority:** High
**Story Points:** 3
**Status:** To Do

---

## User Story

**As a** user
**I want to** disconnect my wallet cleanly
**So that** my session state is cleared and I can connect a different account

---

## Description

Users must be able to disconnect their wallet, which should clear all connection state, remove cached data, and return the UI to the disconnected state. This is essential for testing with multiple accounts or when switching users.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successful disconnect

- **Given:** User is connected with a wallet
- **When:** User clicks "Disconnect" from the wallet dropdown
- **Then:** Wallet state is cleared immediately
- **And:** Navbar shows "Connect Wallet" button
- **And:** Labs show "Connect wallet to continue" prompt

### Scenario 2: Disconnect clears cached data

- **Given:** User disconnects wallet
- **When:** User navigates to any page
- **Then:** No previous wallet data is shown
- **And:** localStorage wallet cache is cleared

### Scenario 3: Can reconnect after disconnect

- **Given:** User has disconnected
- **When:** User clicks "Connect Wallet" again
- **Then:** Connection modal appears
- **And:** User can connect same or different wallet

---

## Technical Notes

### Implementation

```typescript
import { useDisconnect } from 'wagmi';

function DisconnectButton() {
  const { disconnect } = useDisconnect();

  return (
    <button onClick={() => disconnect()}>
      Disconnect
    </button>
  );
}
```

### State Cleanup

wagmi's `disconnect()` handles:
- Clearing account state
- Clearing chain state
- Removing localStorage cache

---

## Dependencies

### Blocked By

- W3QA-7 (MetaMask Connection)

### Blocks

- W3QA-11 (Network Switching)

---

## Definition of Done

- [ ] Disconnect clears all wallet state
- [ ] UI updates to disconnected state
- [ ] Can reconnect after disconnect
- [ ] No stale data remains
- [ ] E2E test for disconnect flow

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-W3QA-6-wallet-connectivity/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-008)
