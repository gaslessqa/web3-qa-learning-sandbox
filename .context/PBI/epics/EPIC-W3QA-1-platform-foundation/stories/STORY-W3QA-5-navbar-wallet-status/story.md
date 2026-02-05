# Navbar Wallet Status

**Jira Key:** W3QA-5
**Epic:** EPIC-W3QA-1 (Platform Foundation)
**Priority:** Medium
**Story Points:** 2
**Status:** To Do

---

## User Story

**As a** user
**I want to** see my current wallet connection status and network in the navbar
**So that** I always know my Web3 context while using the platform

---

## Description

The navbar should display the current wallet connection state at all times. When disconnected, show a "Connect Wallet" button. When connected, show the truncated wallet address and the current network with a visual indicator. This provides constant awareness of the Web3 context, which is essential for understanding what will happen when interacting with contracts.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Disconnected state display

- **Given:** User has not connected a wallet
- **When:** User views any page
- **Then:** Navbar shows "Connect Wallet" button
- **And:** No address or network is displayed

### Scenario 2: Connected state display

- **Given:** User has connected wallet with address `0x1234567890abcdef1234567890abcdef12345678`
- **When:** User views any page
- **Then:** Navbar shows truncated address `0x1234...5678`
- **And:** Network badge shows current network name

### Scenario 3: Network indicator colors

- **Given:** User is connected to different networks
- **When:** Connected to Hardhat localhost
- **Then:** Network badge shows "Hardhat" with gray color
- **When:** Connected to Sepolia
- **Then:** Network badge shows "Sepolia" with yellow color
- **When:** Connected to Mainnet
- **Then:** Network badge shows "Ethereum" with blue color

### Scenario 4: Copy address to clipboard

- **Given:** User is connected with displayed address
- **When:** User clicks on the truncated address
- **Then:** Full address is copied to clipboard
- **And:** Toast notification confirms "Address copied"

---

## Technical Notes

### Frontend

- Use wagmi hooks: `useAccount`, `useChainId`
- Truncate address utility function
- Network color mapping

### Components

```tsx
// components/web3/WalletStatus.tsx
'use client';

import { useAccount, useChainId } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function WalletStatus() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  if (!isConnected) {
    return <ConnectButton />;
  }

  return (
    <div className="flex items-center gap-2">
      <NetworkBadge chainId={chainId} />
      <AddressDisplay address={address} />
    </div>
  );
}
```

### Address Truncation

```typescript
function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
// 0x1234567890abcdef... → 0x1234...cdef
```

### Network Colors

```typescript
const networkColors: Record<number, string> = {
  1: 'bg-blue-500',      // Mainnet
  11155111: 'bg-yellow-500', // Sepolia
  31337: 'bg-gray-500',  // Hardhat
};
```

---

## Dependencies

### Blocked By

- W3QA-4 (Wallet State Persistence)

### Blocks

- None (completes EPIC-W3QA-1)

---

## Definition of Done

- [ ] "Connect Wallet" shows when disconnected
- [ ] Truncated address shows when connected
- [ ] Network badge shows with correct color
- [ ] Click to copy works
- [ ] Unit tests for truncation and color mapping
- [ ] Visual tests for all states

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-W3QA-1-platform-foundation/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-004)
