# Environment Setup Documentation

**Jira Key:** W3QA-32
**Epic:** EPIC-W3QA-29 (Local Blockchain)
**Priority:** Medium
**Story Points:** 2
**Status:** To Do

---

## User Story

**As a** learner
**I want to** follow setup documentation to configure my local environment
**So that** I can get started quickly without guesswork

---

## Description

Comprehensive documentation covering installation of prerequisites, cloning the repo, installing dependencies, starting the local chain, and connecting MetaMask.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Fresh setup from documentation

- **Given:** User has no prior setup
- **When:** User follows documentation step-by-step
- **Then:** Environment is fully configured in < 15 minutes
- **And:** User can submit a transaction on local chain

### Scenario 2: Troubleshooting section

- **Given:** User encounters common error
- **When:** User checks troubleshooting section
- **Then:** Error and solution are documented
- **And:** User can resolve the issue

### Scenario 3: Multi-OS support

- **Given:** Documentation exists
- **When:** User is on Windows, Mac, or Linux
- **Then:** OS-specific instructions are provided
- **And:** All commands work on that OS

---

## Technical Notes

### Documentation Structure

```markdown
# Local Development Setup

## Prerequisites
- Node.js 18+
- Git
- MetaMask browser extension

## Installation

### 1. Clone Repository
### 2. Install Dependencies
### 3. Start Hardhat Node
### 4. Configure MetaMask
### 5. Verify Setup

## Troubleshooting
- Port 8545 already in use
- MetaMask not detecting network
- Nonce too high error
```

---

## Dependencies

### Blocked By

- W3QA-31 (Practice Contracts)

### Blocks

- W3QA-33 (Funded Accounts docs)

---

## Definition of Done

- [ ] Documentation in /docs/setup.md
- [ ] Covers Windows, Mac, Linux
- [ ] Tested on fresh machine
- [ ] Troubleshooting section complete
- [ ] Screenshots included

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-026)
