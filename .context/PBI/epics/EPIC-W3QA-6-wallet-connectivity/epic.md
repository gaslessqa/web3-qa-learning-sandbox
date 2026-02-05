# Wallet Connectivity

**Jira Key:** W3QA-6
**Status:** TO DO
**Priority:** CRITICAL
**Phase:** Foundation (Sprint 1-2)

---

## Epic Description

This epic implements Web3 wallet integration using wagmi, viem, and RainbowKit. It enables users to connect their wallets (MetaMask, WalletConnect), view their connected address, switch networks, and disconnect cleanly.

**Business Value:**
Wallet connectivity is the cornerstone of the "wallet-first" learning approach. Every interaction with smart contracts requires a connected wallet. This epic enables all hands-on Web3 learning experiences.

---

## User Stories

| ID | Story | Points |
|----|-------|--------|
| **W3QA-7** | As a user, I want to connect my MetaMask wallet so that I can interact with smart contracts | 5 |
| **W3QA-8** | As a user, I want to connect via WalletConnect so that I can use mobile wallets | 3 |
| **W3QA-9** | As a user, I want to see my connected address (truncated) so that I know which account is active | 2 |
| **W3QA-10** | As a user, I want to disconnect my wallet cleanly so that my session state is cleared | 3 |
| **W3QA-11** | As a user, I want to switch networks from the UI so that I can test on different chains | 8 |

---

## Scope

### In Scope

- RainbowKit integration for wallet modal
- MetaMask connector configuration
- WalletConnect v2 connector
- Address display component (truncated format)
- Disconnect functionality
- Network switching UI
- Supported networks: Hardhat (localhost), Sepolia, Ethereum Mainnet

### Out of Scope (Future)

- Coinbase Wallet connector
- Hardware wallet support (Ledger, Trezor)
- Multi-account management
- ENS name resolution

---

## Acceptance Criteria (Epic Level)

1. ✅ User can connect MetaMask via RainbowKit modal
2. ✅ User can connect via WalletConnect QR code
3. ✅ Connected address displays as `0x1234...5678`
4. ✅ Disconnect clears all wallet state
5. ✅ Network switcher shows supported networks
6. ✅ Network switch triggers MetaMask popup

---

## Related Functional Requirements

- **FR-005:** MetaMask Wallet Connection
- **FR-006:** WalletConnect Connection
- **FR-007:** Connected Address Display
- **FR-008:** Wallet Disconnect
- **FR-009:** Network Switching

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Web3 Stack

- **wagmi:** React hooks for Ethereum
- **viem:** Low-level Ethereum client
- **RainbowKit:** Wallet connection UI

### Configuration

```typescript
// wagmi config
const config = createConfig({
  chains: [hardhat, sepolia, mainnet],
  connectors: [
    injected(),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID }),
  ],
  transports: {
    [hardhat.id]: http('http://localhost:8545'),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_ID}`),
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`),
  },
});
```

### Component Structure

```
components/web3/
├── ConnectButton.tsx      # RainbowKit wrapper
├── WalletStatus.tsx       # Address display
├── NetworkSwitcher.tsx    # Network dropdown
└── DisconnectButton.tsx   # Disconnect action
```

---

## Dependencies

### External Dependencies

- wagmi ^2.x
- viem ^2.x
- @rainbow-me/rainbowkit ^2.x
- WalletConnect Project ID

### Internal Dependencies

- EPIC-W3QA-1 (Platform Foundation)

### Blocks

- EPIC-W3QA-18 (Smart Contract Labs)
- EPIC-W3QA-24 (Transaction Monitoring)

---

## Success Metrics

### Functional Metrics

- Connection success rate > 95%
- Disconnect clears state 100%
- Network switch works on all supported chains

### Business Metrics

- Enables hands-on learning experience
- Foundation for all Web3 interactions

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| MetaMask not installed | Medium | High | Show install guide, detect extension |
| WalletConnect timeout | Medium | Medium | Set reasonable timeout, show retry option |
| Network switch rejected | Low | Medium | Handle rejection gracefully, show message |
| RainbowKit breaking changes | High | Low | Pin version, follow migration guides |

---

## Testing Strategy

### Test Coverage Requirements

- **Unit Tests:** Address formatting, network mapping
- **Integration Tests:** wagmi hooks, provider state
- **E2E Tests:** Full connection flow (requires Synpress for MetaMask)

---

## Implementation Plan

### Recommended Story Order

1. W3QA-7 - MetaMask Connection (core functionality)
2. W3QA-9 - Address Display (immediate feedback)
3. W3QA-10 - Wallet Disconnect (complete flow)
4. W3QA-8 - WalletConnect (additional connector)
5. W3QA-11 - Network Switching (advanced feature)

### Estimated Effort

- **Development:** 1.5 sprints
- **Testing:** 0.5 sprint
- **Total:** 2 sprints

---

## Related Documentation

- **PRD:** `.context/PRD/user-journeys.md` (Journey 2: Wallet Connection)
- **SRS:** `.context/SRS/functional-specs.md` (FR-005 to FR-009)
- **Architecture:** `.context/SRS/architecture-specs.md`
