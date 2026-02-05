# Network Switching

**Jira Key:** W3QA-11
**Epic:** EPIC-W3QA-6 (Wallet Connectivity)
**Priority:** Medium
**Story Points:** 8
**Status:** To Do

---

## User Story

**As a** user
**I want to** switch networks from the platform UI
**So that** I can test on different chains without leaving the app

---

## Description

Users should be able to switch between supported networks (Hardhat localhost, Sepolia, Ethereum Mainnet) directly from the platform. The switch should trigger the wallet's network switch request and handle cases where the network needs to be added first.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Switch to existing network

- **Given:** User is connected on Sepolia
- **And:** Hardhat network is already added to MetaMask
- **When:** User selects "Hardhat" from network dropdown
- **Then:** MetaMask popup asks to switch networks
- **When:** User approves
- **Then:** Network badge updates to "Hardhat"

### Scenario 2: Switch to new network (add + switch)

- **Given:** User is connected on Mainnet
- **And:** Sepolia is NOT added to MetaMask
- **When:** User selects "Sepolia" from network dropdown
- **Then:** MetaMask popup asks to add network
- **When:** User approves adding
- **Then:** MetaMask asks to switch to new network
- **When:** User approves switch
- **Then:** Network badge updates to "Sepolia"

### Scenario 3: User rejects network switch

- **Given:** User is connected on Sepolia
- **When:** User selects "Hardhat" from dropdown
- **And:** User rejects the switch in MetaMask
- **Then:** Error message shows "Network switch cancelled"
- **And:** Current network remains Sepolia

### Scenario 4: Unsupported network warning

- **Given:** User manually switches MetaMask to an unsupported network
- **When:** Platform detects unsupported chain ID
- **Then:** Warning banner shows "Unsupported network"
- **And:** Network switcher suggests supported networks

---

## Technical Notes

### Implementation

```typescript
import { useSwitchChain } from 'wagmi';

function NetworkSwitcher() {
  const { chains, switchChain } = useSwitchChain();

  return (
    <select onChange={(e) => switchChain({ chainId: Number(e.target.value) })}>
      {chains.map((chain) => (
        <option key={chain.id} value={chain.id}>
          {chain.name}
        </option>
      ))}
    </select>
  );
}
```

### Supported Chains

```typescript
// lib/wagmi.ts
chains: [
  hardhat,    // chainId: 31337
  sepolia,    // chainId: 11155111
  mainnet,    // chainId: 1
]
```

### Chain Addition Parameters

For chains not in MetaMask by default:
```typescript
// Hardhat needs to be added manually
{
  chainId: '0x7A69', // 31337 in hex
  chainName: 'Hardhat',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['http://localhost:8545'],
}
```

---

## Dependencies

### Blocked By

- W3QA-10 (Wallet Disconnect)

### Blocks

- None (completes EPIC-W3QA-6)

---

## Definition of Done

- [ ] Can switch between all supported networks
- [ ] Add network flow works for missing networks
- [ ] Rejection handled gracefully
- [ ] Unsupported network shows warning
- [ ] Network badge updates correctly
- [ ] E2E tests for network switching

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-W3QA-6-wallet-connectivity/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-009)
