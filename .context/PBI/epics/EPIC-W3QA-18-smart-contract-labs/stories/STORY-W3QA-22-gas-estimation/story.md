# Gas Estimation Display

**Jira Key:** W3QA-22
**Epic:** EPIC-W3QA-18 (Smart Contract Labs)
**Priority:** Medium
**Story Points:** 3
**Status:** To Do

---

## User Story

**As a** learner
**I want to** see gas estimation before signing a transaction
**So that** I understand the transaction cost

---

## Description

Before submitting a write transaction, users should see the estimated gas units, current gas price, and estimated total cost in ETH. This helps learners understand the economics of blockchain transactions.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successful gas estimation

- **Given:** User has filled in write function arguments
- **When:** Arguments are valid
- **Then:** Gas estimate displays automatically
- **And:** Shows: gas units, gas price, total cost

### Scenario 2: Estimation fails (will revert)

- **Given:** Arguments would cause transaction to revert
- **When:** Gas estimation is attempted
- **Then:** Warning shows "Transaction may fail"
- **And:** Revert reason displayed if available

### Scenario 3: Gas price updates

- **Given:** Gas estimation is displayed
- **When:** Network gas price changes
- **Then:** Estimate updates (every 15s)
- **And:** Shows "Updated X seconds ago"

---

## Technical Notes

### Gas Estimation

```tsx
import { useEstimateGas, useGasPrice } from 'wagmi';

function GasEstimate({ address, abi, functionName, args }) {
  const { data: gasLimit } = useEstimateGas({
    to: address,
    data: encodeFunctionData({ abi, functionName, args }),
  });

  const { data: gasPrice } = useGasPrice();

  const totalCost = gasLimit * gasPrice;

  return (
    <div>
      <div>Gas Limit: {gasLimit?.toString()}</div>
      <div>Gas Price: {formatGwei(gasPrice)} Gwei</div>
      <div>Est. Cost: {formatEther(totalCost)} ETH</div>
    </div>
  );
}
```

---

## Dependencies

### Blocked By

- W3QA-20 (Read Functions)

### Blocks

- W3QA-21 (Write Functions)

---

## Definition of Done

- [ ] Gas estimation displays before write
- [ ] Shows gas units, price, total cost
- [ ] Handles estimation failure gracefully
- [ ] Updates periodically
- [ ] Formatted nicely (Gwei, ETH)

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-018)
