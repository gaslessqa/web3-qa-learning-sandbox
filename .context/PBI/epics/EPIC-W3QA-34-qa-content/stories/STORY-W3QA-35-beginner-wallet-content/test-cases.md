# Test Cases — STORY-W3QA-35: Beginner Wallet Testing Content

## Content QA (Manual)

### TC-W3QA-35-001 — Concept clarity for beginners
**Steps**
1. Read each wallet lesson top-to-bottom without prior Web3 assumptions.

**Expected**
- Terms like "provider", "chainId", "signature" are explained in plain language
- No critical steps are implied but not stated

### TC-W3QA-35-002 — Checklists match platform behavior
**Steps**
1. Execute the manual steps in the platform UI for each wallet lesson.

**Expected**
- Expected results match actual UI states
- No outdated UI labels or missing buttons

### TC-W3QA-35-003 — Automation guidance is realistic
**Steps**
1. Review automation section for each lesson.

**Expected**
- Clear split: stable Playwright checks vs Synpress E2E
- No claims that require impossible automation without wallet control

### TC-W3QA-35-004 — Links and references
**Steps**
1. Click all internal links to labs/reference pages.

**Expected**
- No 404s
- References point to correct modules

## Automation Candidates
- Docs link checker (CI)
- Markdown lint (CI)
