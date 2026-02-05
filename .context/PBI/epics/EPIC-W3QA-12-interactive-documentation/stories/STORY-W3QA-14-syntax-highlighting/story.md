# Syntax Highlighting

**Jira Key:** W3QA-14
**Epic:** EPIC-W3QA-12 (Interactive Documentation)
**Priority:** High
**Story Points:** 3
**Status:** To Do

---

## User Story

**As a** learner
**I want to** see syntax-highlighted code blocks for Solidity and TypeScript
**So that** I can read and understand code examples easily

---

## Description

Code blocks in MDX documentation should have syntax highlighting with support for Solidity, TypeScript, JavaScript, JSON, and Bash. Code blocks should also include line numbers and a copy button.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Solidity code highlighting

- **Given:** MDX contains a Solidity code block
- **When:** Page renders
- **Then:** Keywords (function, contract, uint256) are highlighted
- **And:** Comments are visually distinct

### Scenario 2: TypeScript code highlighting

- **Given:** MDX contains a TypeScript code block
- **When:** Page renders
- **Then:** Types, keywords, and strings are highlighted
- **And:** Consistent with Solidity theme

### Scenario 3: Copy button functionality

- **Given:** User views a code block
- **When:** User clicks the copy button
- **Then:** Code is copied to clipboard
- **And:** Button shows "Copied!" feedback

---

## Technical Notes

### Implementation with Shiki

```typescript
// mdx-components.tsx
import { highlight } from 'shiki';

async function CodeBlock({ code, lang }) {
  const html = await highlight(code, {
    lang,
    theme: 'github-dark',
  });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

### Supported Languages

- `solidity` - Smart contracts
- `typescript` / `tsx` - Frontend code
- `javascript` / `jsx` - Examples
- `json` - ABI, config files
- `bash` - CLI commands

---

## Dependencies

### Blocked By

- W3QA-13 (Level-Based Docs)

### Blocks

- W3QA-15 (Embedded Components)

---

## Definition of Done

- [ ] Solidity highlights correctly
- [ ] TypeScript highlights correctly
- [ ] Line numbers display
- [ ] Copy button works
- [ ] Dark theme consistent

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-011)
