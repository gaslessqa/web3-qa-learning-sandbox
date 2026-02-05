# Transaction Details View

**Jira Key:** W3QA-26
**Epic:** EPIC-W3QA-24 (Transaction Monitoring)
**Priority:** Medium
**Story Points:** 3
**Status:** To Do

---

## User Story

**As a** learner
**I want to** view detailed information about a transaction
**So that** I can inspect outcomes and understand what happened

---

## Description

Users should be able to see comprehensive transaction details including hash, block number, from/to addresses, value, gas used, input data (decoded if ABI available), and status.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: View confirmed transaction details

- **Given:** User clicks on a transaction hash
- **When:** Details panel opens
- **Then:** Shows: hash, block, timestamp, from, to, value, gas used, status

### Scenario 2: Decoded input data

- **Given:** Transaction was to a known contract
- **When:** Viewing details
- **Then:** Input data shows decoded function name and arguments
- **And:** Raw hex also available

### Scenario 3: Copy transaction data

- **Given:** User views transaction details
- **When:** User clicks copy button next to hash
- **Then:** Full hash copied to clipboard

---

## Technical Notes

```tsx
import { useTransaction, useTransactionReceipt } from 'wagmi';

function TransactionDetails({ hash }) {
  const { data: tx } = useTransaction({ hash });
  const { data: receipt } = useTransactionReceipt({ hash });

  return (
    <div>
      <Row label="Hash" value={tx.hash} copyable />
      <Row label="Block" value={receipt.blockNumber} />
      <Row label="From" value={tx.from} />
      <Row label="To" value={tx.to} />
      <Row label="Value" value={formatEther(tx.value)} />
      <Row label="Gas Used" value={receipt.gasUsed} />
      <Row label="Status" value={receipt.status} />
    </div>
  );
}
```

---

## Dependencies

### Blocked By

- W3QA-25 (Real-time Status)

### Blocks

- W3QA-27 (Event Monitoring)

---

## Definition of Done

- [ ] All transaction fields display
- [ ] Input data decoded when possible
- [ ] Copy buttons work
- [ ] Handles pending transactions
- [ ] Formatted nicely

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-021)
