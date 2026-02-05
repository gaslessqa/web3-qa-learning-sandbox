# Write Contract Functions

**Jira Key:** W3QA-21
**Epic:** EPIC-W3QA-18 (Smart Contract Labs)
**Priority:** High
**Story Points:** 5
**Status:** To Do

---

## User Story

**As a** learner
**I want to** call state-changing contract functions and sign transactions
**So that** I can practice making on-chain state changes

---

## Description

For each write function, users should see input fields, gas estimation, and a "Write" button that triggers a wallet signature request. The transaction should be tracked through its lifecycle.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successful write transaction

- **Given:** User fills in function arguments
- **When:** User clicks "Write"
- **Then:** Gas estimation displays
- **And:** MetaMask popup appears for signing
- **When:** User confirms
- **Then:** Transaction hash is shown
- **And:** Status updates to "Pending"

### Scenario 2: User rejects transaction

- **Given:** MetaMask popup is shown
- **When:** User clicks "Reject"
- **Then:** Message shows "Transaction cancelled"
- **And:** No transaction is submitted

### Scenario 3: Wallet not connected

- **Given:** User is not connected
- **When:** User tries to click "Write"
- **Then:** Button is disabled
- **And:** Message shows "Connect wallet to write"

---

## Technical Notes

### Write Function Component

```tsx
function WriteFunction({ address, abi, functionName }) {
  const { writeContract, isPending, data: hash } = useWriteContract();

  const handleWrite = (args: unknown[]) => {
    writeContract({
      address,
      abi,
      functionName,
      args,
    });
  };

  return (
    <div>
      <ArgumentInputs abi={abi} functionName={functionName} />
      <button onClick={() => handleWrite(args)} disabled={isPending}>
        {isPending ? 'Confirming...' : 'Write'}
      </button>
      {hash && <TransactionStatus hash={hash} />}
    </div>
  );
}
```

---

## Dependencies

### Blocked By

- W3QA-20 (Read Functions)
- W3QA-22 (Gas Estimation)

### Blocks

- W3QA-23 (Transaction Tracking)

---

## Definition of Done

- [ ] Write functions trigger wallet popup
- [ ] Transaction submits on confirmation
- [ ] Rejection handled gracefully
- [ ] Disabled when not connected
- [ ] Transaction hash displayed

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-017)
