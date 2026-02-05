# Practice Smart Contracts

**Jira Key:** W3QA-31
**Epic:** EPIC-W3QA-29 (Local Blockchain)
**Priority:** High
**Story Points:** 3
**Status:** To Do

---

## User Story

**As a** learner
**I want to** have pre-deployed practice contracts with diverse testing scenarios
**So that** I can practice different QA scenarios

---

## Description

Create a set of smart contracts specifically designed for QA learning scenarios: basic read/write, events, access control, revert conditions, and payable functions.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: SimpleStorage contract

- **Given:** Contract is deployed
- **When:** User calls `getValue()`
- **Then:** Returns current stored value
- **When:** User calls `setValue(42)`
- **Then:** Value is updated and event emitted

### Scenario 2: Counter with events

- **Given:** Counter contract deployed
- **When:** User calls `increment()`
- **Then:** `ValueChanged` event emitted with old and new values

### Scenario 3: AccessControl revert

- **Given:** AccessControl contract deployed
- **When:** Non-owner calls `onlyOwnerFunction()`
- **Then:** Transaction reverts with "Not authorized"

---

## Technical Notes

### Contracts to Create

```solidity
// SimpleStorage.sol
contract SimpleStorage {
    uint256 private value;
    event ValueChanged(uint256 newValue);

    function setValue(uint256 _value) external {
        value = _value;
        emit ValueChanged(_value);
    }

    function getValue() external view returns (uint256) {
        return value;
    }
}

// Counter.sol
contract Counter {
    uint256 public count;
    event CountChanged(uint256 oldValue, uint256 newValue);

    function increment() external {
        emit CountChanged(count, count + 1);
        count++;
    }
}

// AccessControl.sol
contract AccessControl {
    address public owner;
    error NotAuthorized();

    constructor() { owner = msg.sender; }

    function onlyOwnerFunction() external view {
        if (msg.sender != owner) revert NotAuthorized();
    }
}
```

---

## Dependencies

### Blocked By

- W3QA-30 (Hardhat Node)

### Blocks

- W3QA-19 (Load Contract in Labs)

---

## Definition of Done

- [ ] 5 practice contracts created
- [ ] All contracts compile
- [ ] Deploy script works
- [ ] ABIs exported
- [ ] Contracts documented

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-025)
