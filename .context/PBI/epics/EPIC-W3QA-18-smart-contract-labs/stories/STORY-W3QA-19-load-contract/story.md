# Load Practice Contract

**Jira Key:** W3QA-19
**Epic:** EPIC-W3QA-18 (Smart Contract Labs)
**Priority:** High
**Story Points:** 3
**Status:** To Do

---

## User Story

**As a** learner
**I want to** load a practice smart contract by address
**So that** I can interact with it in the lab environment

---

## Description

Users should be able to load a smart contract either by selecting a pre-configured practice contract or by entering an address and ABI manually. Once loaded, the contract's functions should be parsed and displayed.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Load pre-configured contract

- **Given:** User is in the lab section
- **When:** User selects "SimpleStorage" from dropdown
- **Then:** Contract loads with pre-configured address and ABI
- **And:** Read/Write functions are displayed

### Scenario 2: Load custom contract

- **Given:** User wants to test a custom contract
- **When:** User enters address and pastes ABI JSON
- **Then:** Contract loads if ABI is valid
- **And:** Functions are parsed and displayed

### Scenario 3: Invalid ABI handling

- **Given:** User enters an invalid ABI
- **When:** User submits
- **Then:** Error message shows "Invalid ABI format"
- **And:** Previous contract remains loaded

---

## Technical Notes

### Contract Loader Component

```tsx
function ContractLoader() {
  const [address, setAddress] = useState('');
  const [abi, setAbi] = useState<Abi>([]);

  const loadPreset = (name: string) => {
    const preset = PRACTICE_CONTRACTS[name];
    setAddress(preset.address);
    setAbi(preset.abi);
  };

  return (
    <div>
      <select onChange={(e) => loadPreset(e.target.value)}>
        <option value="SimpleStorage">SimpleStorage</option>
        <option value="Counter">Counter</option>
      </select>
      {/* Or manual input */}
    </div>
  );
}
```

---

## Dependencies

### Blocked By

- W3QA-6 (Wallet Connectivity)
- W3QA-29 (Local Blockchain)

### Blocks

- W3QA-20 (Read Functions)
- W3QA-21 (Write Functions)

---

## Definition of Done

- [ ] Pre-configured contracts load correctly
- [ ] Custom address/ABI input works
- [ ] ABI validation with error messages
- [ ] Functions parsed from ABI
- [ ] Unit tests for ABI parsing

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-015)
