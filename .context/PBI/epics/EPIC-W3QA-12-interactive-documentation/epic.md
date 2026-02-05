# Interactive Documentation

**Jira Key:** W3QA-12
**Status:** TO DO
**Priority:** CRITICAL
**Phase:** Core Features (Sprint 2-3)

---

## Epic Description

This epic implements the MDX-based documentation system with syntax highlighting, embedded interactive components, sidebar navigation, and search functionality. Documentation is organized by skill level (Beginner/Intermediate/Expert).

**Business Value:**
Documentation is the primary learning delivery mechanism. Interactive components embedded in docs allow learners to practice concepts immediately without context switching. The leveled structure provides a clear learning path.

---

## User Stories

| ID | Story | Points |
|----|-------|--------|
| **W3QA-13** | As a learner, I want documentation organized by level so that I can follow a structured path | 5 |
| **W3QA-14** | As a learner, I want syntax-highlighted code blocks so that I can read code easily | 3 |
| **W3QA-15** | As a learner, I want interactive components in docs so that I can practice without leaving the page | 5 |
| **W3QA-16** | As a learner, I want sidebar navigation so that I can find topics quickly | 5 |
| **W3QA-17** | As a learner, I want to search documentation so that I can find specific topics | 3 |

---

## Scope

### In Scope

- MDX processing (next-mdx-remote or Contentlayer)
- Frontmatter support for metadata
- Level-based content organization
- Syntax highlighting for Solidity, TypeScript, JavaScript
- Custom MDX components (callouts, code blocks, interactive widgets)
- Sidebar navigation with collapsible sections
- Client-side search with fuzzy matching

### Out of Scope (Future)

- PDF export
- Versioned documentation
- Community contributions/comments
- Video embedding

---

## Acceptance Criteria (Epic Level)

1. ✅ MDX files render correctly with all formatting
2. ✅ Code blocks have syntax highlighting for Solidity/TS/JS
3. ✅ Interactive components can access wallet context
4. ✅ Sidebar shows hierarchical navigation by level
5. ✅ Search returns relevant results with snippets

---

## Related Functional Requirements

- **FR-010:** Level-Based Documentation Structure
- **FR-011:** Syntax Highlighting
- **FR-012:** Embedded Interactive Components
- **FR-013:** Sidebar Navigation
- **FR-014:** Documentation Search

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### MDX Setup

- **Option A:** next-mdx-remote (flexibility, runtime rendering)
- **Option B:** Contentlayer (type-safe, build-time)

### Content Structure

```
content/
├── beginner/
│   ├── 01-introduction/
│   │   ├── 01-what-is-web3-qa.mdx
│   │   └── 02-wallet-basics.mdx
│   └── 02-wallet-testing/
├── intermediate/
│   └── 01-transactions/
└── expert/
    └── 01-automation/
```

### Component Structure

```
components/docs/
├── MDXContent.tsx        # MDX renderer
├── CodeBlock.tsx         # Syntax highlighting
├── Sidebar.tsx           # Navigation
├── SearchModal.tsx       # Search UI
└── mdx-components/
    ├── Callout.tsx
    ├── WalletDemo.tsx
    └── ContractInteraction.tsx
```

---

## Dependencies

### External Dependencies

- next-mdx-remote or Contentlayer
- shiki or prism-react-renderer (syntax highlighting)
- fuse.js (client-side search)

### Internal Dependencies

- EPIC-W3QA-1 (Platform Foundation)
- EPIC-W3QA-6 (Wallet Connectivity) - for interactive components

### Blocks

- EPIC-W3QA-34 (QA Content)

---

## Success Metrics

### Functional Metrics

- MDX render time < 500ms
- Search results in < 200ms
- Code blocks support 5+ languages

### Business Metrics

- Beginner module completion rate > 50%
- Search usage per session

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| MDX build performance | Medium | Medium | Use ISR, optimize imports |
| Search index size | Low | Low | Limit index to titles + excerpts |
| Component hydration issues | Medium | Medium | Test SSR/CSR boundary carefully |

---

## Testing Strategy

### Test Coverage Requirements

- **Unit Tests:** MDX components, search logic
- **Integration Tests:** Full page render, navigation
- **E2E Tests:** Browse through documentation, search flow

---

## Implementation Plan

### Recommended Story Order

1. W3QA-13 - Level-Based Structure (content architecture)
2. W3QA-14 - Syntax Highlighting (code readability)
3. W3QA-16 - Sidebar Navigation (discovery)
4. W3QA-15 - Interactive Components (engagement)
5. W3QA-17 - Documentation Search (findability)

### Estimated Effort

- **Development:** 2 sprints
- **Testing:** 0.5 sprint
- **Total:** 2.5 sprints

---

## Related Documentation

- **PRD:** `.context/PRD/user-journeys.md` (Journey 1: Documentation)
- **SRS:** `.context/SRS/functional-specs.md` (FR-010 to FR-014)
- **Architecture:** `.context/SRS/architecture-specs.md`
