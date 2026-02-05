# MetaMask Wallet Connection

**Jira Key:** W3QA-7
**Epic:** EPIC-W3QA-6 (Wallet Connectivity)
**Priority:** High
**Story Points:** 5
**Status:** To Do

---

## User Story

**As a** user
**I want to** connect my MetaMask wallet
**So that** I can interact with smart contracts in the labs

---

## Description

Users should be able to connect their MetaMask browser extension wallet through a clean modal interface powered by RainbowKit. The connection flow should handle common scenarios including MetaMask not installed, user rejection, and successful connection with address display.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successful MetaMask connection

- **Given:** User has MetaMask extension installed
- **When:** User clicks "Connect Wallet" and selects MetaMask
- **Then:** MetaMask popup appears requesting connection
- **When:** User approves the connection
- **Then:** Modal closes and address is displayed in navbar

### Scenario 2: User rejects connection

- **Given:** User has MetaMask extension installed
- **When:** User clicks "Connect Wallet" and selects MetaMask
- **And:** User clicks "Reject" in MetaMask popup
- **Then:** Modal shows "Connection rejected" message
- **And:** User can try again

### Scenario 3: MetaMask not installed

- **Given:** User does NOT have MetaMask installed
- **When:** User clicks "Connect Wallet"
- **Then:** MetaMask option shows "Install" link
- **When:** User clicks the link
- **Then:** User is directed to MetaMask download page

---

## Technical Notes

### Frontend

- RainbowKit handles MetaMask detection and connection
- wagmi `injected()` connector for MetaMask

### Implementation

```tsx
// Already configured in wagmi config
connectors: [
  injected(), // Handles MetaMask
]

// RainbowKit provides the modal
<ConnectButton />
```

---

## Dependencies

### Blocked By

- W3QA-4 (Wallet State Persistence)

### Blocks

- W3QA-9 (Address Display)
- W3QA-10 (Wallet Disconnect)

---

## Definition of Done

- [ ] MetaMask connects successfully
- [ ] Rejection handled gracefully
- [ ] Install link works when not installed
- [ ] E2E test with Synpress (future)

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-W3QA-6-wallet-connectivity/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-005)
