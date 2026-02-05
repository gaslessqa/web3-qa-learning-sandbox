# Transaction Status Tracking

**Jira Key:** W3QA-23
**Epic:** EPIC-W3QA-18 (Smart Contract Labs)
**Priority:** High
**Story Points:** 5
**Status:** To Do

---

## User Story

**As a** learner
**I want to** track my transaction status through its lifecycle
**So that** I can understand the confirmation process

---

## Description

After submitting a transaction, users should see real-time status updates: pending → confirmed OR reverted. The UI should show confirmation count, block number, and link to explorer.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Transaction confirms

- **Given:** Transaction is submitted
- **When:** Transaction is in mempool
- **Then:** Status shows "Pending" with spinner
- **When:** Transaction is mined
- **Then:** Status shows "Confirmed" with checkmark
- **And:** Block number and confirmations displayed

### Scenario 2: Transaction reverts

- **Given:** Transaction is submitted
- **When:** Transaction reverts on-chain
- **Then:** Status shows "Reverted" with X icon
- **And:** Revert reason displayed if available

### Scenario 3: Confirmation counter

- **Given:** Transaction is confirmed
- **When:** New blocks are mined
- **Then:** Confirmation count increments
- **And:** Shows "3 confirmations" etc.

---

## Technical Notes

### Transaction Tracking

```tsx
import { useWaitForTransactionReceipt } from 'wagmi';

function TransactionStatus({ hash }) {
  const { data: receipt, isLoading, isSuccess, isError } =
    useWaitForTransactionReceipt({ hash });

  if (isLoading) return <Pending hash={hash} />;
  if (isSuccess) return <Confirmed receipt={receipt} />;
  if (isError) return <Failed hash={hash} />;
}
```

### Status States

- `pending` - Yellow spinner
- `confirmed` - Green checkmark
- `reverted` - Red X with reason

---

## Dependencies

### Blocked By

- W3QA-21 (Write Functions)

### Blocks

- EPIC-W3QA-24 (Transaction Monitoring)

---

## Definition of Done

- [ ] Pending state with spinner
- [ ] Confirmed state with details
- [ ] Reverted state with reason
- [ ] Confirmation counter works
- [ ] Explorer link displays

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-019)
