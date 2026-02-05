# Sidebar Navigation

**Jira Key:** W3QA-16
**Epic:** EPIC-W3QA-12 (Interactive Documentation)
**Priority:** High
**Story Points:** 5
**Status:** To Do

---

## User Story

**As a** learner
**I want to** use a sidebar navigation to browse documentation
**So that** I can find topics quickly and understand the content structure

---

## Description

Documentation pages should have a sidebar showing the navigation tree organized by level and module. The current page should be highlighted, parent sections expanded, and collapse state should persist.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Sidebar shows current location

- **Given:** User is on `/docs/beginner/wallets/connect`
- **When:** Page renders
- **Then:** Sidebar shows Beginner level expanded
- **And:** Wallets module expanded
- **And:** "Connect" page is highlighted

### Scenario 2: Collapse/expand modules

- **Given:** User views sidebar with multiple modules
- **When:** User clicks on a module header
- **Then:** Module toggles between expanded/collapsed
- **And:** State persists on navigation

### Scenario 3: Mobile sidebar behavior

- **Given:** User is on mobile viewport
- **When:** User taps hamburger menu
- **Then:** Sidebar slides in as drawer
- **When:** User selects a page
- **Then:** Drawer closes and page loads

---

## Technical Notes

### Navigation Tree Generation

```typescript
// lib/docs.ts
export function getNavigation() {
  return [
    {
      level: 'beginner',
      label: 'Beginner',
      modules: [
        {
          slug: 'introduction',
          title: 'Introduction',
          pages: [
            { slug: 'welcome', title: 'Welcome' },
            { slug: 'setup', title: 'Setup' },
          ],
        },
      ],
    },
  ];
}
```

### Collapse State Persistence

```typescript
// Store in localStorage
const [collapsed, setCollapsed] = useLocalStorage('sidebar-collapsed', {});
```

---

## Dependencies

### Blocked By

- W3QA-13 (Level-Based Docs)

### Blocks

- W3QA-17 (Documentation Search)

---

## Definition of Done

- [ ] Navigation tree renders correctly
- [ ] Current page highlighted
- [ ] Collapse/expand works
- [ ] State persists in localStorage
- [ ] Mobile drawer works
- [ ] Keyboard accessible

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-013)
