# Test Cases — STORY-W3QA-37: Gas Mechanics Content

## Content QA (Manual)

### TC-W3QA-37-001 — Estimation vs actual comparison
**Steps**
1. Follow the lab steps: estimate gas, submit tx, inspect receipt gasUsed.

**Expected**
- Lesson explains why estimate and gasUsed can differ
- No incorrect claims about "exact matching"

### TC-W3QA-37-002 — Insufficient funds scenario
**Steps**
1. Simulate low balance on local chain (or use a low-balance account).
2. Attempt a tx.

**Expected**
- Lesson describes correct error class and user guidance

### TC-W3QA-37-003 — Estimation failure scenario
**Steps**
1. Use inputs that cause revert; check estimation.

**Expected**
- Lesson correctly links estimation failure to "would revert" behavior
