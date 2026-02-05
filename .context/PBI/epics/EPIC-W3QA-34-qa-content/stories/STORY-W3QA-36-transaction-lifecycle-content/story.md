# Transaction Lifecycle Content

**Jira Key:** W3QA-36
**Epic:** EPIC-W3QA-34 (QA Content)
**Priority:** High
**Story Points:** 5
**Status:** To Do

---

## User Story

**As a** learner
**I want to** read Intermediate content on transaction lifecycle
**So that** I understand what to test when transactions are involved

---

## Description

Create content explaining the full transaction lifecycle from a QA perspective: signing, broadcasting, pending state, confirmation, and potential failure modes. Include how to correlate UI state with on-chain state.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Lifecycle stages explained

- **Given:** User reads transaction lifecycle content
- **When:** Content loads
- **Then:** Each stage is explained: sign → broadcast → pending → confirmed/reverted
- **And:** Diagrams illustrate the flow

### Scenario 2: Testing scenarios identified

- **Given:** User reads about pending state
- **When:** Section covers testing
- **Then:** Lists what to test: UI feedback, timeout handling, stuck transactions
- **And:** Provides test case examples

### Scenario 3: UI correlation explained

- **Given:** User reads about state correlation
- **When:** Content explains
- **Then:** Shows how to verify UI matches on-chain state
- **And:** Common bugs in this area highlighted

---

## Technical Notes

### Content Outline

```
content/intermediate/01-transactions/
├── 01-transaction-anatomy.mdx     # nonce, gas, data, signature
├── 02-lifecycle-stages.mdx        # sign → broadcast → confirm
├── 03-pending-state.mdx           # mempool, replacements
├── 04-confirmation-depth.mdx      # confirmations, finality
└── 05-state-verification.mdx      # UI vs on-chain
```

### Key Topics

- Transaction components (nonce, gas limit, gas price, data)
- Signing process (what happens in wallet)
- Broadcast and mempool
- Mining/confirmation
- Revert reasons
- UI state synchronization

---

## Dependencies

### Blocked By

- W3QA-35 (Beginner Content)

### Blocks

- W3QA-37 (Gas Content)

---

## Definition of Done

- [ ] 4-5 Intermediate articles
- [ ] Diagrams for lifecycle
- [ ] Test scenarios listed
- [ ] Lab exercises linked
- [ ] Technical review passed

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-029)
