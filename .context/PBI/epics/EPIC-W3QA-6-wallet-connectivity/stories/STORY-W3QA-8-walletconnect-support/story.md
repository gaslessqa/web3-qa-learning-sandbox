# WalletConnect Support

**Jira Key:** W3QA-8
**Epic:** EPIC-W3QA-6 (Wallet Connectivity)
**Priority:** Medium
**Story Points:** 3
**Status:** To Do

---

## User Story

**As a** user
**I want to** connect via WalletConnect
**So that** I can use my mobile wallet with the platform

---

## Description

Users should be able to connect using WalletConnect v2, which displays a QR code that can be scanned with a mobile wallet app (e.g., MetaMask Mobile, Rainbow, Trust Wallet). This enables users who prefer mobile wallets to participate in labs.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successful WalletConnect connection

- **Given:** User has a WalletConnect-compatible mobile wallet
- **When:** User clicks "Connect Wallet" and selects WalletConnect
- **Then:** QR code is displayed in the modal
- **When:** User scans QR code with mobile wallet and approves
- **Then:** Connection is established and address is displayed

### Scenario 2: Connection timeout

- **Given:** User selects WalletConnect
- **When:** QR code is displayed but not scanned for 60 seconds
- **Then:** Modal shows "Connection timed out" message
- **And:** User can generate a new QR code

### Scenario 3: User rejects on mobile

- **Given:** User scans QR code with mobile wallet
- **When:** User rejects the connection request on mobile
- **Then:** Modal shows "Connection rejected" message

---

## Technical Notes

### Frontend

- WalletConnect v2 connector with project ID
- Project ID from WalletConnect Cloud dashboard

### Configuration

```typescript
// lib/wagmi.ts
connectors: [
  walletConnect({
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
    metadata: {
      name: 'Web3 QA Learning Hub',
      description: 'Learn Web3 QA by doing',
      url: 'https://web3qa.dev',
      icons: ['https://web3qa.dev/icon.png'],
    },
  }),
]
```

---

## Dependencies

### Blocked By

- W3QA-7 (MetaMask Connection) - same connection infrastructure

### Blocks

- None

---

## Definition of Done

- [ ] WalletConnect QR code displays
- [ ] Mobile wallet connection works
- [ ] Timeout handled gracefully
- [ ] Project ID configured via env var

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-W3QA-6-wallet-connectivity/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-006)
