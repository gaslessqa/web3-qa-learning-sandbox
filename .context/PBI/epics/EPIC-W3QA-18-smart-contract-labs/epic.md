# Smart Contract Labs

**Jira Key:** W3QA-18
**Status:** TO DO
**Priority:** CRITICAL
**Phase:** Core Features (Sprint 3-4)

---

## Epic Description

This epic implements the hands-on lab environment where learners interact with smart contracts. It includes loading contracts by address, calling read/write functions, gas estimation display, and transaction status tracking through the full lifecycle.

**Business Value:**
Labs are the core differentiator of the platform. This is where learners move from theory to practice, executing real transactions and observing blockchain behavior firsthand. This hands-on experience is what makes Web3 QA skills stick.

---

## User Stories

| ID | Story | Points |
|----|-------|--------|
| **W3QA-19** | As a learner, I want to load a practice contract by address so that I can interact with it | 3 |
| **W3QA-20** | As a learner, I want to call read functions and see results so that I can verify contract state | 5 |
| **W3QA-21** | As a learner, I want to call write functions and sign transactions so that I can practice state changes | 5 |
| **W3QA-22** | As a learner, I want to see gas estimation before signing so that I understand transaction costs | 3 |
| **W3QA-23** | As a learner, I want to track transaction status so that I can understand the lifecycle | 5 |

---

## Scope

### In Scope

- Contract loader (address + ABI)
- Pre-configured practice contracts
- Dynamic function UI from ABI
- Read function execution (useReadContract)
- Write function execution (useWriteContract)
- Gas estimation display
- Transaction lifecycle tracking (pending → confirmed/reverted)

### Out of Scope (Future)

- Custom ABI upload
- Contract deployment from UI
- Multi-call batching
- Historical transaction view

---

## Acceptance Criteria (Epic Level)

1. ✅ Contract loads and displays available functions
2. ✅ Read functions return and display results
3. ✅ Write functions trigger wallet popup
4. ✅ Gas estimation shows before transaction
5. ✅ Transaction status updates in real-time

---

## Related Functional Requirements

- **FR-015:** Load Practice Contract
- **FR-016:** Read Contract Functions
- **FR-017:** Write Contract Functions
- **FR-018:** Gas Estimation Display
- **FR-019:** Transaction Status Tracking

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Contract Interaction

```typescript
// Read function
const { data } = useReadContract({
  address: contractAddress,
  abi: contractABI,
  functionName: 'getValue',
});

// Write function
const { writeContract } = useWriteContract();
writeContract({
  address: contractAddress,
  abi: contractABI,
  functionName: 'setValue',
  args: [newValue],
});
```

### Component Structure

```
components/lab/
├── ContractLoader.tsx      # Address + ABI input
├── FunctionList.tsx        # Read/Write function tabs
├── ReadFunction.tsx        # Read function UI
├── WriteFunction.tsx       # Write function UI
├── GasEstimate.tsx         # Gas display
├── TransactionStatus.tsx   # Lifecycle tracker
└── InputField.tsx          # Dynamic input by type
```

### ABI Type Handling

- `uint256`, `int256` → Number input
- `address` → Address input with validation
- `bool` → Toggle
- `string` → Text input
- `bytes` → Hex input

---

## Dependencies

### External Dependencies

- wagmi (useReadContract, useWriteContract)
- viem (ABI parsing, encoding)

### Internal Dependencies

- EPIC-W3QA-1 (Platform Foundation)
- EPIC-W3QA-6 (Wallet Connectivity)
- EPIC-W3QA-29 (Local Blockchain) - for practice contracts

### Blocks

- EPIC-W3QA-24 (Transaction Monitoring)

---

## Success Metrics

### Functional Metrics

- Read functions execute in < 500ms
- Write transactions broadcast successfully
- Gas estimation accuracy within 10%

### Business Metrics

- Lab completion rate > 40%
- Transactions per session > 3

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| ABI parsing errors | Medium | Medium | Validate ABI structure, handle gracefully |
| Gas estimation fails | Medium | High | Show warning, allow manual override |
| Transaction reverts | Low | High | Display revert reason clearly |
| RPC rate limiting | Medium | Low | Implement retry logic, show error |

---

## Testing Strategy

### Test Coverage Requirements

- **Unit Tests:** ABI parsing, input validation, type conversion
- **Integration Tests:** Full read/write flow with mock provider
- **E2E Tests:** Complete lab exercise (requires Synpress)

---

## Implementation Plan

### Recommended Story Order

1. W3QA-19 - Load Contract (foundation)
2. W3QA-20 - Read Functions (simpler, no signing)
3. W3QA-22 - Gas Estimation (needed for writes)
4. W3QA-21 - Write Functions (core interaction)
5. W3QA-23 - Transaction Tracking (completion)

### Estimated Effort

- **Development:** 2 sprints
- **Testing:** 1 sprint
- **Total:** 3 sprints

---

## Related Documentation

- **PRD:** `.context/PRD/user-journeys.md` (Journey 2: Lab Practice)
- **SRS:** `.context/SRS/functional-specs.md` (FR-015 to FR-019)
- **Architecture:** `.context/SRS/architecture-specs.md`
