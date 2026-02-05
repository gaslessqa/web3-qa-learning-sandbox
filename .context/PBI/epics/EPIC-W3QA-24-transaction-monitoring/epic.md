# Transaction & Event Monitoring

**Jira Key:** W3QA-24
**Status:** TO DO
**Priority:** HIGH
**Phase:** Core Features (Sprint 4)

---

## Epic Description

This epic implements real-time monitoring of blockchain activity. It includes live transaction status updates, detailed transaction inspection, event monitoring with decoded parameters, and links to block explorers for further investigation.

**Business Value:**
Understanding what happens on-chain is crucial for QA engineers. This epic provides the observability tools that help learners correlate UI actions with blockchain state changes, a key skill for Web3 testing.

---

## User Stories

| ID | Story | Points |
|----|-------|--------|
| **W3QA-25** | As a learner, I want real-time transaction status updates so that I can observe confirmation flow | 3 |
| **W3QA-26** | As a learner, I want to view transaction details so that I can inspect outcomes | 3 |
| **W3QA-27** | As a learner, I want to monitor emitted events so that I can verify on-chain behavior | 5 |
| **W3QA-28** | As a learner, I want links to block explorer so that I can investigate further | 2 |

---

## Scope

### In Scope

- Real-time status updates (useWaitForTransactionReceipt)
- Transaction detail view (hash, block, gas, status)
- Event log decoding with ABI
- Block explorer links (Etherscan, local chain message)
- Toast notifications for status changes

### Out of Scope (Future)

- Historical transaction search
- Event subscription (watching for new events)
- Transaction simulation/dry-run
- Gas profiling

---

## Acceptance Criteria (Epic Level)

1. ✅ Transaction status updates without page refresh
2. ✅ Transaction details show all key information
3. ✅ Events are decoded with parameter names and values
4. ✅ Explorer links open correct page for chain

---

## Related Functional Requirements

- **FR-020:** Real-Time Transaction Status
- **FR-021:** Transaction Details View
- **FR-022:** Event Monitoring
- **FR-023:** Block Explorer Links

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Transaction Monitoring

```typescript
const { data: receipt, isLoading, isSuccess } = useWaitForTransactionReceipt({
  hash: txHash,
});
```

### Event Decoding

```typescript
import { decodeEventLog } from 'viem';

const decoded = decodeEventLog({
  abi: contractABI,
  data: log.data,
  topics: log.topics,
});
```

### Component Structure

```
components/monitoring/
├── TransactionTracker.tsx    # Live status display
├── TransactionDetails.tsx    # Full tx info
├── EventMonitor.tsx          # Event list
├── EventLog.tsx              # Single event display
├── ExplorerLink.tsx          # Chain-aware link
└── StatusBadge.tsx           # Pending/Confirmed/Reverted
```

### Explorer URL Mapping

```typescript
const explorerUrls: Record<number, string> = {
  1: 'https://etherscan.io',
  11155111: 'https://sepolia.etherscan.io',
  31337: null, // Local chain - no explorer
};
```

---

## Dependencies

### External Dependencies

- wagmi (useWaitForTransactionReceipt)
- viem (decodeEventLog, formatters)

### Internal Dependencies

- EPIC-W3QA-6 (Wallet Connectivity)
- EPIC-W3QA-18 (Smart Contract Labs) - transactions to monitor

### Blocks

- None (final epic in interaction chain)

---

## Success Metrics

### Functional Metrics

- Status updates within 2s of block confirmation
- Event decoding success rate > 95%
- Explorer links work for all supported chains

### Business Metrics

- Learners understand transaction lifecycle
- Reduced "where did my tx go?" confusion

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| WebSocket unavailable | Medium | Medium | Fallback to polling |
| Event decoding fails | Low | Medium | Show raw log data |
| Explorer down | Low | Low | Show tx hash, copy button |

---

## Testing Strategy

### Test Coverage Requirements

- **Unit Tests:** Status mapping, event decoding, URL generation
- **Integration Tests:** Full transaction monitoring flow
- **E2E Tests:** Submit tx, watch status, verify events

---

## Implementation Plan

### Recommended Story Order

1. W3QA-25 - Real-time Status (core monitoring)
2. W3QA-28 - Explorer Links (quick investigation)
3. W3QA-26 - Transaction Details (deeper info)
4. W3QA-27 - Event Monitoring (advanced feature)

### Estimated Effort

- **Development:** 1 sprint
- **Testing:** 0.5 sprint
- **Total:** 1.5 sprints

---

## Related Documentation

- **PRD:** `.context/PRD/user-journeys.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-020 to FR-023)
- **Architecture:** `.context/SRS/architecture-specs.md`
