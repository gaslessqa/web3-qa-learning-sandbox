# Test Cases — STORY-W3QA-14: Syntax-Highlighted Code Blocks

## Manual Test Cases

### TC-W3QA-14-001 — Solidity highlighting
**Steps**
1. Open a lesson containing a Solidity code block.
2. Inspect keywords, comments, strings, and function names.

**Expected**
- Syntax coloring is applied consistently
- Block is readable and not plain monochrome text

### TC-W3QA-14-002 — TypeScript highlighting
**Steps**
1. Open a lesson containing TypeScript code.
2. Inspect imports, types, functions, strings.

**Expected**
- TypeScript tokens are highlighted appropriately

### TC-W3QA-14-003 — Long code block overflow
**Steps**
1. Open a lesson with a long line or long block.
2. Check mobile and desktop viewports.

**Expected**
- Horizontal scrolling is contained within code block
- Page layout does not break

### TC-W3QA-14-004 — Inline code rendering
**Steps**
1. Open text containing inline code snippets.
2. Inspect styling.

**Expected**
- Inline code is visually distinct and readable

## Automation Candidates (Playwright)
- Assert code block containers render (`pre > code`)
- Assert code block wrapper has syntax/highlight class
- Assert overflow behavior (scroll container present)
