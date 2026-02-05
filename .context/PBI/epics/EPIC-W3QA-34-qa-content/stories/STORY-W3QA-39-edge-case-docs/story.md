# Edge Case Documentation

**Jira Key:** W3QA-39
**Epic:** EPIC-W3QA-34 (QA Content)
**Priority:** Medium
**Story Points:** 3
**Status:** To Do

---

## User Story

**As a** learner
**I want to** have documentation on edge cases and error scenarios
**So that** I can test error paths comprehensively

---

## Description

Document common Web3 edge cases with reproduction steps, expected behavior, and how to test them. Focus on scenarios that are unique to Web3 and often missed by traditional QA.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Edge case reproducible

- **Given:** User reads "Insufficient Gas" edge case
- **When:** User follows reproduction steps
- **Then:** Edge case can be reproduced on local chain
- **And:** Expected error message appears

### Scenario 2: Each edge case documented

- **Given:** Edge case documentation exists
- **When:** User views an edge case
- **Then:** Shows: description, reproduction steps, expected behavior, test data

### Scenario 3: Categorized by type

- **Given:** User browses edge cases
- **When:** Viewing the list
- **Then:** Edge cases grouped by category
- **And:** Easy to find relevant scenarios

---

## Technical Notes

### Edge Cases to Document

```
content/edge-cases/
├── wallet/
│   ├── wallet-locked.mdx
│   ├── account-changed-externally.mdx
│   └── network-changed-externally.mdx
├── transactions/
│   ├── insufficient-gas.mdx
│   ├── rejected-by-user.mdx
│   ├── reverted-on-chain.mdx
│   └── stuck-pending.mdx
└── network/
    ├── rpc-unavailable.mdx
    ├── unsupported-network.mdx
    └── chain-reorg.mdx
```

### Edge Case Format

```markdown
# Insufficient Gas

## Description
Transaction fails because gas limit is set too low.

## Reproduction Steps
1. Start local Hardhat node
2. Connect wallet
3. Set manual gas limit to 21000
4. Call a function that uses more gas

## Expected Behavior
- MetaMask may warn before signing
- Or transaction reverts with "out of gas"

## Test Data
- Contract: Counter
- Function: increment()
- Gas limit: 21000 (actual need: ~43000)
```

---

## Dependencies

### Blocked By

- W3QA-38 (QA Checklists)

### Blocks

- None (completes EPIC-W3QA-34)

---

## Definition of Done

- [ ] 8-10 edge cases documented
- [ ] All reproducible on local chain
- [ ] Clear reproduction steps
- [ ] Categorized by type
- [ ] Linked from relevant checklists

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-032)
