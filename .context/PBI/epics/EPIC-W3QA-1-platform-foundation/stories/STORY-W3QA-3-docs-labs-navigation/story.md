# Docs/Labs Navigation

**Jira Key:** W3QA-3
**Epic:** EPIC-W3QA-1 (Platform Foundation)
**Priority:** High
**Story Points:** 3
**Status:** To Do

---

## User Story

**As a** user
**I want to** navigate between documentation and labs seamlessly
**So that** I can switch between theory and practice without friction

---

## Description

Users should be able to move between the documentation section (`/docs/*`) and the lab section (`/lab/*`) with instant client-side navigation. The transition should feel seamless, with no full page reloads, and all application state (especially wallet connection) should persist across navigation.

The navigation should provide clear visual indication of the current section and make it easy to return to where the user left off.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Navigate from Docs to Labs

- **Given:** User is viewing a documentation page at `/docs/beginner/wallets`
- **When:** User clicks the "Labs" link in the navbar
- **Then:** Page navigates to `/lab` without full reload
- **And:** Navigation completes in < 300ms
- **And:** "Labs" link shows active state

### Scenario 2: Navigate from Labs to Docs

- **Given:** User is in the lab section at `/lab/intermediate`
- **When:** User clicks the "Docs" link in the navbar
- **Then:** Page navigates to `/docs` without full reload
- **And:** "Docs" link shows active state
- **And:** Any lab state is preserved (can return)

### Scenario 3: Deep link navigation works

- **Given:** User shares a link to `/docs/intermediate/transactions`
- **When:** Another user opens that link directly
- **Then:** Page loads correctly at that route
- **And:** Navigation reflects the current location

### Scenario 4: Browser back/forward works

- **Given:** User has navigated: Home → Docs → Labs → Docs
- **When:** User clicks browser back button twice
- **Then:** User returns to Labs
- **And:** Then to first Docs page
- **And:** Scroll position is restored

---

## Technical Notes

### Frontend

- Use Next.js App Router for routing
- Use `<Link>` component for client-side navigation
- Implement prefetching for common routes
- Use `usePathname()` to determine active link

### Components

```tsx
// Navbar link with active state
<Link
  href="/docs"
  className={cn(
    "nav-link",
    pathname.startsWith('/docs') && "nav-link-active"
  )}
>
  Docs
</Link>
```

### Route Structure

```
app/
├── page.tsx           # Home /
├── docs/
│   └── [...slug]/
│       └── page.tsx   # /docs/*
└── lab/
    └── [...slug]/
        └── page.tsx   # /lab/*
```

---

## Dependencies

### Blocked By

- W3QA-2 (Responsive Interface)

### Blocks

- W3QA-4 (Wallet State Persistence)

---

## Definition of Done

- [ ] Client-side navigation works between all sections
- [ ] Active link state is visually distinct
- [ ] Navigation completes in < 300ms
- [ ] Browser history works correctly
- [ ] Deep links work on fresh load
- [ ] Unit tests for navigation logic
- [ ] E2E tests for navigation flows

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-W3QA-1-platform-foundation/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-002)
