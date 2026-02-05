# Event Monitoring

**Jira Key:** W3QA-27
**Epic:** EPIC-W3QA-24 (Transaction Monitoring)
**Priority:** High
**Story Points:** 5
**Status:** To Do

---

## User Story

**As a** learner
**I want to** monitor emitted events from my transactions
**So that** I can verify on-chain behavior matches expectations

---

## Description

When a transaction emits events, they should be decoded and displayed with event name, indexed parameters, and data parameters. This is crucial for QA validation of contract behavior.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Display emitted events

- **Given:** Transaction emitted `ValueChanged(uint256 oldValue, uint256 newValue)`
- **When:** Viewing transaction events
- **Then:** Shows event name "ValueChanged"
- **And:** Shows parameters: oldValue=10, newValue=42

### Scenario 2: Multiple events

- **Given:** Transaction emitted 3 events
- **When:** Viewing transaction events
- **Then:** All 3 events listed in order
- **And:** Each event expandable for details

### Scenario 3: Unknown event (no ABI)

- **Given:** Event from unknown contract
- **When:** Viewing events
- **Then:** Shows raw topic[0] hash
- **And:** Shows raw data hex

---

## Technical Notes

```tsx
import { decodeEventLog } from 'viem';

function EventList({ logs, abi }) {
  return logs.map((log) => {
    try {
      const decoded = decodeEventLog({ abi, data: log.data, topics: log.topics });
      return <DecodedEvent {...decoded} />;
    } catch {
      return <RawEvent log={log} />;
    }
  });
}
```

---

## Dependencies

### Blocked By

- W3QA-26 (Transaction Details)

### Blocks

- W3QA-28 (Explorer Links)

---

## Definition of Done

- [ ] Events decoded with ABI
- [ ] Parameter names and values shown
- [ ] Multiple events handled
- [ ] Fallback for unknown events
- [ ] Log index displayed

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-022)
