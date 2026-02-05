# Block Explorer Links

**Jira Key:** W3QA-28
**Epic:** EPIC-W3QA-24 (Transaction Monitoring)
**Priority:** Low
**Story Points:** 2
**Status:** To Do

---

## User Story

**As a** learner
**I want to** click a link to view my transaction on a block explorer
**So that** I can investigate further using external tools

---

## Description

Transaction hashes and addresses should link to the appropriate block explorer based on the current chain. Local chains should show a message instead of a broken link.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Mainnet transaction link

- **Given:** User is on Ethereum Mainnet
- **When:** User clicks explorer link for tx
- **Then:** Opens `https://etherscan.io/tx/{hash}` in new tab

### Scenario 2: Sepolia transaction link

- **Given:** User is on Sepolia testnet
- **When:** User clicks explorer link
- **Then:** Opens `https://sepolia.etherscan.io/tx/{hash}`

### Scenario 3: Local chain (no explorer)

- **Given:** User is on Hardhat localhost
- **When:** Viewing a transaction
- **Then:** Shows "Local chain - no explorer"
- **And:** No link displayed

---

## Technical Notes

```typescript
const EXPLORER_URLS: Record<number, string | null> = {
  1: 'https://etherscan.io',
  11155111: 'https://sepolia.etherscan.io',
  31337: null, // Local chain
};

function getExplorerUrl(chainId: number, hash: string): string | null {
  const base = EXPLORER_URLS[chainId];
  return base ? `${base}/tx/${hash}` : null;
}
```

---

## Dependencies

### Blocked By

- W3QA-27 (Event Monitoring)

### Blocks

- None (completes EPIC-W3QA-24)

---

## Definition of Done

- [ ] Links work for Mainnet
- [ ] Links work for Sepolia
- [ ] Local chain shows message
- [ ] Opens in new tab
- [ ] Address links also work

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-023)
