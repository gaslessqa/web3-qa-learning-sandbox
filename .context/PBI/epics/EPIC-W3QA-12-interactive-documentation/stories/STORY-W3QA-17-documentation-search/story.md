# Documentation Search

**Jira Key:** W3QA-17
**Epic:** EPIC-W3QA-12 (Interactive Documentation)
**Priority:** Medium
**Story Points:** 3
**Status:** To Do

---

## User Story

**As a** learner
**I want to** search documentation content
**So that** I can find specific topics quickly

---

## Description

Users should be able to search across all documentation using a search input. Search should be client-side with fuzzy matching, returning results with title, snippet, and level badge.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Search returns results

- **Given:** User types "wallet" in search input
- **When:** Query has 2+ characters
- **Then:** Dropdown shows matching pages
- **And:** Results show title, snippet with highlight, level badge

### Scenario 2: No results found

- **Given:** User types "xyznonexistent"
- **When:** No pages match
- **Then:** Dropdown shows "No results found"
- **And:** Suggests checking spelling

### Scenario 3: Navigate to result

- **Given:** Search shows results for "transaction"
- **When:** User clicks a result
- **Then:** User navigates to that page
- **And:** Search closes

---

## Technical Notes

### Client-Side Search with Fuse.js

```typescript
import Fuse from 'fuse.js';

const fuse = new Fuse(searchIndex, {
  keys: ['title', 'content'],
  threshold: 0.3,
  includeMatches: true,
});

const results = fuse.search(query);
```

### Search Index Generation (Build Time)

```typescript
// scripts/generate-search-index.ts
const index = docs.map(doc => ({
  slug: doc.slug,
  title: doc.title,
  level: doc.level,
  content: doc.plainText.slice(0, 500),
}));
```

---

## Dependencies

### Blocked By

- W3QA-16 (Sidebar Navigation)
- W3QA-15 (Embedded Components)

### Blocks

- None (completes EPIC-W3QA-12)

---

## Definition of Done

- [ ] Search input in header/sidebar
- [ ] Results appear as user types (debounced)
- [ ] Results show title, snippet, level
- [ ] Click navigates to page
- [ ] Keyboard navigation works (up/down/enter)
- [ ] Search index generated at build

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-014)
