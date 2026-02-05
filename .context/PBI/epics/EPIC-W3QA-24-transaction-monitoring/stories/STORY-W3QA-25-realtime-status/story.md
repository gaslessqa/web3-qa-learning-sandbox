# Real-Time Transaction Status

**Jira Key:** W3QA-25
**Epic:** EPIC-W3QA-24 (Transaction Monitoring)
**Priority:** High
**Story Points:** 3
**Status:** To Do

---

## User Story

**As a** learner
**I want to** see real-time transaction status updates
**So that** I can observe the confirmation flow without refreshing

---

## Description

Transaction status should update automatically as the transaction progresses through the blockchain. Updates should occur via WebSocket subscription or polling, with visual feedback for each state change.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Real-time pending to confirmed

- **Given:** User submitted a transaction
- **When:** Transaction is mined
- **Then:** Status updates automatically to "Confirmed"
- **And:** No page refresh required
- **And:** Toast notification appears

### Scenario 2: Confirmation counter increments

- **Given:** Transaction is confirmed with 1 confirmation
- **When:** Next block is mined
- **Then:** Counter updates to "2 confirmations"
- **And:** Updates continue for each block

### Scenario 3: WebSocket fallback to polling

- **Given:** RPC doesn't support WebSocket
- **When:** Monitoring a transaction
- **Then:** System falls back to polling
- **And:** Updates still occur (every 2-12s depending on chain)

---

## Technical Notes

```tsx
const { data, isLoading } = useWaitForTransactionReceipt({
  hash,
  confirmations: 1,
  onReplaced: (replacement) => {
    // Handle speed up or cancel
  },
});
```

---

## Dependencies

### Blocked By

- W3QA-23 (Transaction Tracking)

### Blocks

- W3QA-26 (Transaction Details)

---

## Definition of Done

- [ ] Status updates without refresh
- [ ] Confirmation counter increments
- [ ] Toast notifications on state change
- [ ] Works with polling fallback

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-020)
