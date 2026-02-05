# Pre-Funded Test Accounts

**Jira Key:** W3QA-33
**Epic:** EPIC-W3QA-29 (Local Blockchain)
**Priority:** Low
**Story Points:** 1
**Status:** To Do

---

## User Story

**As a** learner
**I want to** have test accounts with ETH balance on the local chain
**So that** I can transact immediately without setup

---

## Description

Document the Hardhat default accounts (addresses and private keys) so learners can import them into MetaMask and start testing immediately. Include security warnings.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Import test account

- **Given:** User reads account documentation
- **When:** User imports private key into MetaMask
- **Then:** Account shows 10,000 ETH balance
- **And:** User can send transactions

### Scenario 2: Security warning displayed

- **Given:** User views test accounts
- **When:** Documentation loads
- **Then:** Warning banner shows "NEVER use on mainnet"
- **And:** Explains these are well-known keys

### Scenario 3: Multiple accounts available

- **Given:** User needs multiple accounts for testing
- **When:** User checks documentation
- **Then:** First 3 accounts are listed
- **And:** Link to full list of 20 accounts

---

## Technical Notes

### Hardhat Default Accounts (First 3)

```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```

### Security Warning

```markdown
⚠️ **WARNING: Test Accounts Only**

These private keys are publicly known and included in every Hardhat installation.

**NEVER:**
- Use these accounts on mainnet
- Send real funds to these addresses
- Use these keys for anything other than local testing
```

---

## Dependencies

### Blocked By

- W3QA-32 (Setup Docs)

### Blocks

- None (completes EPIC-W3QA-29)

---

## Definition of Done

- [ ] First 3 accounts documented
- [ ] Private keys listed with warnings
- [ ] Import instructions for MetaMask
- [ ] Security warning prominent
- [ ] Link to all 20 accounts

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-027)
