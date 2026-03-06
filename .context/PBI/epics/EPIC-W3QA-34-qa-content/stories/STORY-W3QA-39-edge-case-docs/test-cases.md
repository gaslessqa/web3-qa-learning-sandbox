# Test Cases — STORY-W3QA-39: Edge Case Playbook

## Content QA (Manual)

### TC-W3QA-39-001 — Correct classification
**Steps**
1. For each edge case, check the "cause category" mapping.

**Expected**
- Wallet vs RPC vs contract vs UI classification is reasonable and consistent

### TC-W3QA-39-002 — Reproducibility
**Steps**
1. Attempt to reproduce at least 5 edge cases in local chain.

**Expected**
- Reproduction steps are realistic
- Notes include when reproduction requires testnet or special setup

### TC-W3QA-39-003 — Evidence completeness
**Steps**
1. Follow playbook evidence instructions for a failing tx.

**Expected**
- Captures tx hash, chainId, UI screenshot, and error message context
