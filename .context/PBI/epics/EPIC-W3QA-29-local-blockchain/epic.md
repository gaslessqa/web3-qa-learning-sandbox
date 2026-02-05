# Local Blockchain Environment

**Jira Key:** W3QA-29
**Status:** TO DO
**Priority:** CRITICAL
**Phase:** Foundation (Sprint 1)

---

## Epic Description

This epic sets up the Hardhat local blockchain environment for safe, free practice. It includes documentation for running a local node, pre-deployed practice contracts with various testing scenarios, setup guides, and pre-funded test accounts.

**Business Value:**
A local blockchain removes all barriers to practice: no faucets needed, instant transactions, free gas, and the ability to reset state. This enables learners to experiment freely without fear of losing real funds or waiting for testnet faucets.

---

## User Stories

| ID | Story | Points |
|----|-------|--------|
| **W3QA-30** | As a learner, I want to run a local Hardhat node so that I can practice without testnet faucets | 2 |
| **W3QA-31** | As a learner, I want pre-deployed practice contracts so that I have realistic scenarios | 3 |
| **W3QA-32** | As a learner, I want setup documentation so that I can get started quickly | 2 |
| **W3QA-33** | As a learner, I want funded test accounts so that I can transact immediately | 1 |

---

## Scope

### In Scope

- Hardhat project configuration
- Practice contracts:
  - SimpleStorage (basic read/write)
  - Counter (increment/decrement with events)
  - AccessControl (owner-only functions)
  - EventEmitter (multiple event types)
  - PayableDemo (ETH transfers)
- Deploy scripts
- Setup documentation (Windows, Mac, Linux)
- Test account documentation

### Out of Scope (Future)

- Foundry alternative setup
- Docker-based environment
- Testnet deployment scripts
- Contract verification

---

## Acceptance Criteria (Epic Level)

1. ✅ `npx hardhat node` starts local chain on port 8545
2. ✅ Practice contracts deploy automatically on node start
3. ✅ Documentation covers setup for all major OS
4. ✅ Test accounts have 10,000 ETH each

---

## Related Functional Requirements

- **FR-024:** Hardhat Node Documentation
- **FR-025:** Pre-Deployed Practice Contracts
- **FR-026:** Environment Setup Documentation
- **FR-027:** Pre-Funded Test Accounts

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Hardhat Configuration

```typescript
// hardhat.config.ts
const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    hardhat: {
      chainId: 31337,
    },
  },
};
```

### Practice Contracts

```
contracts/
├── SimpleStorage.sol    # setValue, getValue
├── Counter.sol          # increment, decrement, ValueChanged event
├── AccessControl.sol    # onlyOwner modifier, AccessDenied error
├── EventEmitter.sol     # Multiple event types
└── PayableDemo.sol      # receive(), withdraw()
```

### Deploy Script

```typescript
// scripts/deploy.ts
async function main() {
  const SimpleStorage = await ethers.getContractFactory('SimpleStorage');
  const storage = await SimpleStorage.deploy();
  console.log('SimpleStorage deployed to:', storage.target);
  // ... deploy all contracts
}
```

---

## Dependencies

### External Dependencies

- Hardhat ^2.x
- @nomicfoundation/hardhat-toolbox
- Solidity 0.8.20

### Internal Dependencies

- None (this is infrastructure)

### Blocks

- EPIC-W3QA-18 (Smart Contract Labs) - needs contracts to interact with

---

## Success Metrics

### Functional Metrics

- Node starts in < 5s
- All contracts deploy successfully
- Documentation setup time < 15 minutes

### Business Metrics

- Learners can practice immediately
- Zero cost for experimentation

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Node.js version incompatibility | Medium | Low | Document required version |
| Port 8545 conflict | Low | Medium | Document how to change port |
| Solidity compilation errors | Medium | Low | Pin Solidity version |

---

## Testing Strategy

### Test Coverage Requirements

- **Unit Tests:** Contract functionality (Hardhat tests)
- **Integration Tests:** Deploy script execution
- **E2E Tests:** Full setup from fresh environment

---

## Implementation Plan

### Recommended Story Order

1. W3QA-30 - Hardhat Node (infrastructure)
2. W3QA-31 - Practice Contracts (core content)
3. W3QA-33 - Funded Accounts (documentation)
4. W3QA-32 - Setup Documentation (onboarding)

### Estimated Effort

- **Development:** 0.5 sprint
- **Testing:** 0.5 sprint
- **Total:** 1 sprint

---

## Related Documentation

- **PRD:** `.context/PRD/mvp-scope.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-024 to FR-027)
- **Architecture:** `.context/SRS/architecture-specs.md`
