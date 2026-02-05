# Level-Based Documentation Structure

**Jira Key:** W3QA-13
**Epic:** EPIC-W3QA-12 (Interactive Documentation)
**Priority:** High
**Story Points:** 5
**Status:** To Do

---

## User Story

**As a** learner
**I want to** read documentation organized by skill level (Beginner/Intermediate/Expert)
**So that** I can follow a structured learning path appropriate to my experience

---

## Description

Documentation should be organized into three skill levels with clear visual distinction. Each level contains modules, and each module contains pages. The structure should be reflected in the URL, navigation, and page headers.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Navigate to level-specific content

- **Given:** User is on the documentation home page
- **When:** User clicks on "Beginner" level
- **Then:** User sees all Beginner modules listed
- **And:** URL is `/docs/beginner`

### Scenario 2: Level badge on pages

- **Given:** User is viewing a Beginner page
- **When:** Page renders
- **Then:** "Beginner" badge is visible in page header
- **And:** Badge has distinct color (green for beginner)

### Scenario 3: Sequential navigation within level

- **Given:** User is on page 1 of a module
- **When:** User clicks "Next"
- **Then:** User navigates to page 2 of same module
- **And:** Progress within module is indicated

---

## Technical Notes

### Content Structure

```
content/
├── beginner/
│   ├── _meta.json          # Level metadata
│   └── 01-introduction/
│       ├── _meta.json      # Module metadata
│       ├── 01-welcome.mdx
│       └── 02-setup.mdx
├── intermediate/
└── expert/
```

### Frontmatter Schema

```yaml
---
title: "Welcome to Web3 QA"
level: beginner
module: introduction
order: 1
---
```

---

## Dependencies

### Blocked By

- W3QA-2 (Responsive Interface)

### Blocks

- W3QA-14 (Syntax Highlighting)
- W3QA-16 (Sidebar Navigation)

---

## Definition of Done

- [ ] Three levels render correctly
- [ ] Level badges display on pages
- [ ] URL structure reflects hierarchy
- [ ] Next/Previous navigation works
- [ ] Frontmatter parsed correctly

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-010)
