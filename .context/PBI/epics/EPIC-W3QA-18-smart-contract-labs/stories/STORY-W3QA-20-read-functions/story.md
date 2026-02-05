# Read Contract Functions

**Jira Key:** W3QA-20
**Epic:** EPIC-W3QA-18 (Smart Contract Labs)
**Priority:** High
**Story Points:** 5
**Status:** To Do

---

## User Story

**As a** learner
**I want to** call read-only (view/pure) contract functions and see results
**So that** I can verify contract state without spending gas

---

## Description

For each read function in the loaded contract, users should see a UI with input fields (if the function takes arguments) and a "Read" button. Results should display with proper type formatting.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Call function without arguments

- **Given:** Contract has `getValue()` function
- **When:** User clicks "Read"
- **Then:** Result displays (e.g., "42")
- **And:** Type shows (e.g., "uint256")

### Scenario 2: Call function with arguments

- **Given:** Contract has `balanceOf(address)` function
- **When:** User enters an address and clicks "Read"
- **Then:** Result displays the balance
- **And:** Loading state shown during call

### Scenario 3: Handle revert

- **Given:** Read function that reverts for certain inputs
- **When:** User calls with invalid input
- **Then:** Error message shows revert reason
- **And:** UI remains usable

---

## Technical Notes

### Read Function Component

```tsx
function ReadFunction({ address, abi, functionName, args }) {
  const { data, isLoading, error, refetch } = useReadContract({
    address,
    abi,
    functionName,
    args,
  });

  return (
    <div>
      <button onClick={() => refetch()}>Read</button>
      {isLoading && <Spinner />}
      {data && <Result value={data} />}
      {error && <Error message={error.message} />}
    </div>
  );
}
```

### Type Formatting

- `uint256` → Format with commas
- `address` → Truncate + copy button
- `bool` → "true" / "false" badge
- `bytes` → Hex with copy

---

## Dependencies

### Blocked By

- W3QA-19 (Load Contract)

### Blocks

- W3QA-21 (Write Functions)

---

## Definition of Done

- [ ] Read functions execute correctly
- [ ] Arguments input dynamically generated
- [ ] Results formatted by type
- [ ] Loading and error states handled
- [ ] Refetch button works

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-016)
