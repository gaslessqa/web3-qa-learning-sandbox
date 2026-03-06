# Test Cases — STORY-W3QA-36: Transaction Lifecycle Content

## Content QA (Manual)

### TC-W3QA-36-001 — Lifecycle accuracy
**Steps**
1. Follow the lesson and submit a tx in labs.

**Expected**
- Lesson's state transitions match actual UI and receipt behavior

### TC-W3QA-36-002 — Revert explanation quality
**Steps**
1. Trigger a revert in labs.

**Expected**
- Lesson explains plausible causes and correct evidence to collect
- Does not blame the wallet for contract reverts

### TC-W3QA-36-003 — Bug report template completeness
**Steps**
1. Use the template from the lesson to write a sample bug report.

**Expected**
- Includes tx hash, network, expected vs actual, and reproducible steps

## Automation Candidates
- Docs build validation + link checking
