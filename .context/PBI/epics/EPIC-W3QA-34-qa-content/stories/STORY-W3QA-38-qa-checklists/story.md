# QA Checklists

**Jira Key:** W3QA-38
**Epic:** EPIC-W3QA-34 (QA Content)
**Priority:** High
**Story Points:** 5
**Status:** To Do

---

## User Story

**As a** learner
**I want to** have ready-to-use QA checklists for common Web3 flows
**So that** I have practical testing guides I can apply immediately

---

## Description

Create comprehensive, actionable checklists for testing common Web3 flows. Each item should have clear pass/fail criteria. Checklists should be printable and usable in real projects.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Wallet connection checklist

- **Given:** User accesses wallet checklist
- **When:** Checklist loads
- **Then:** Contains 10+ test items
- **And:** Each item has pass/fail criteria
- **And:** Covers happy path and edge cases

### Scenario 2: Interactive checklist

- **Given:** User views checklist on platform
- **When:** User checks off items
- **Then:** Progress is tracked visually
- **And:** Can reset checklist

### Scenario 3: Printable format

- **Given:** User wants to use checklist offline
- **When:** User clicks "Print"
- **Then:** Clean printable format generated
- **And:** No interactive elements in print

---

## Technical Notes

### Checklists to Create

```
content/checklists/
├── wallet-connection.mdx
├── transaction-submission.mdx
├── network-switching.mdx
└── error-handling.mdx
```

### Checklist Item Format

```markdown
- [ ] **Connect wallet successfully**
  - Action: Click "Connect Wallet", select MetaMask, approve
  - Expected: Address displays in navbar
  - Pass: Address shows as 0x1234...5678
  - Fail: Error message, no address shown
```

### Key Checklists

1. **Wallet Connection** (15 items)
   - Connect, disconnect, reject, switch account, switch network

2. **Transaction Submission** (12 items)
   - Gas estimation, signing, confirmation, revert

3. **Error Handling** (10 items)
   - Insufficient funds, rejected, reverted, network error

---

## Dependencies

### Blocked By

- W3QA-37 (Gas Content)

### Blocks

- W3QA-39 (Edge Case Docs)

---

## Definition of Done

- [ ] 3+ checklists created
- [ ] 10+ items per checklist
- [ ] Interactive checkboxes work
- [ ] Print-friendly CSS
- [ ] Downloadable as PDF

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-031)
