# Hardhat Node Setup

**Jira Key:** W3QA-30
**Epic:** EPIC-W3QA-29 (Local Blockchain)
**Priority:** High
**Story Points:** 2
**Status:** To Do

---

## User Story

**As a** learner
**I want to** run a local Hardhat node
**So that** I can practice without needing testnet faucets or spending real ETH

---

## Description

The platform should include a Hardhat project that learners can run locally. The node provides instant block mining, deterministic accounts, and free transactions for learning.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Start Hardhat node

- **Given:** User has Node.js installed
- **When:** User runs `npx hardhat node` in contracts directory
- **Then:** Node starts on `localhost:8545`
- **And:** Console shows 20 pre-funded accounts

### Scenario 2: Connect MetaMask to local node

- **Given:** Hardhat node is running
- **When:** User adds network with chainId 31337
- **Then:** MetaMask connects successfully
- **And:** Account shows 10,000 ETH balance

### Scenario 3: Instant transaction mining

- **Given:** User submits a transaction
- **When:** Transaction is broadcast
- **Then:** Transaction mines immediately (no wait)
- **And:** Block number increments

---

## Technical Notes

### Hardhat Configuration

```typescript
// contracts/hardhat.config.ts
import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    hardhat: {
      chainId: 31337,
      mining: {
        auto: true,
        interval: 0,
      },
    },
  },
};

export default config;
```

---

## Dependencies

### Blocked By

- None (infrastructure)

### Blocks

- W3QA-31 (Practice Contracts)
- W3QA-32 (Setup Docs)

---

## Definition of Done

- [ ] Hardhat config created
- [ ] Node starts successfully
- [ ] MetaMask can connect
- [ ] Transactions mine instantly
- [ ] Package.json scripts added

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-024)
