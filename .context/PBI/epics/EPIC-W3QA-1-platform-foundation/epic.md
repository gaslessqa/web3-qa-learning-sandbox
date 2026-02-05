# Platform Foundation

**Jira Key:** W3QA-1
**Status:** TO DO
**Priority:** CRITICAL
**Phase:** Foundation (Sprint 1)

---

## Epic Description

This epic establishes the core infrastructure for the Web3 QA Learning Hub platform. It includes the responsive web application shell, navigation system, and the foundational layout that maintains wallet state across all pages.

**Business Value:**
The platform foundation is the prerequisite for all other features. Without a solid, responsive base that preserves Web3 context (wallet connection) during navigation, learners cannot have a seamless experience switching between documentation and hands-on labs.

---

## User Stories

| ID | Story | Points |
|----|-------|--------|
| **W3QA-2** | As a user, I want to access a responsive web interface so that I can learn from any device | 3 |
| **W3QA-3** | As a user, I want to navigate between docs and labs seamlessly so that I can switch between theory and practice | 3 |
| **W3QA-4** | As a user, I want the platform to maintain my wallet connection across pages so that I don't have to reconnect | 5 |
| **W3QA-5** | As a user, I want to see my wallet status in the navbar so that I always know my Web3 context | 2 |

---

## Scope

### In Scope

- Next.js App Router setup with TypeScript
- Responsive layout (mobile, tablet, desktop)
- Global navigation (navbar with Docs/Labs links)
- wagmi/RainbowKit provider wrapper at root level
- Wallet state persistence via React Context
- Navbar component with wallet status indicator

### Out of Scope (Future)

- User authentication (login/register)
- Progress tracking
- Dark mode toggle (use system preference for MVP)
- Internationalization

---

## Acceptance Criteria (Epic Level)

1. ✅ Platform loads in < 2s on desktop (LCP)
2. ✅ Layout adapts correctly to mobile (320px) through desktop (1920px)
3. ✅ Navigation between /docs and /lab preserves wallet connection
4. ✅ Navbar displays wallet address when connected
5. ✅ Navbar shows "Connect Wallet" when disconnected

---

## Related Functional Requirements

- **FR-001:** Responsive Web Interface
- **FR-002:** Navigation Between Docs and Labs
- **FR-003:** Wallet State Persistence Across Pages
- **FR-004:** Navbar Wallet Status Display

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Frontend Architecture

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS with responsive utilities
- **State:** wagmi for wallet state, React Context for app state

### Component Structure

```
app/
├── layout.tsx          # Root layout with Providers
├── page.tsx            # Home page
├── docs/
│   └── [...slug]/page.tsx
└── lab/
    └── [...slug]/page.tsx

components/
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
└── providers/
    └── Web3Provider.tsx
```

---

## Dependencies

### External Dependencies

- Next.js 15
- wagmi + viem
- RainbowKit
- Tailwind CSS

### Internal Dependencies

- None (this is the foundation)

### Blocks

- EPIC-W3QA-6 (Wallet Connectivity)
- EPIC-W3QA-12 (Interactive Documentation)
- EPIC-W3QA-18 (Smart Contract Labs)

---

## Success Metrics

### Functional Metrics

- All pages load without console errors
- Lighthouse Performance score > 90
- No layout shifts (CLS < 0.1)

### Business Metrics

- Foundation for all user journeys
- Enables subsequent epic development

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| App Router complexity | Medium | Medium | Follow Next.js docs, use proven patterns |
| wagmi/RainbowKit breaking changes | High | Low | Pin versions, test on upgrade |
| Mobile responsiveness issues | Medium | Medium | Use Tailwind responsive utilities, test on real devices |

---

## Testing Strategy

### Test Coverage Requirements

- **Unit Tests:** Layout components, responsive utilities
- **Integration Tests:** Navigation flow, provider wrapping
- **E2E Tests:** Full navigation journey, responsive breakpoints

---

## Implementation Plan

### Recommended Story Order

1. W3QA-2 - Responsive Interface (foundation)
2. W3QA-3 - Docs/Labs Navigation (routing)
3. W3QA-4 - Wallet State Persistence (Web3 providers)
4. W3QA-5 - Navbar Wallet Status (UI completion)

### Estimated Effort

- **Development:** 1 sprint
- **Testing:** 0.5 sprint
- **Total:** 1.5 sprints

---

## Related Documentation

- **PRD:** `.context/PRD/executive-summary.md`, `.context/PRD/mvp-scope.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-001 to FR-004)
- **Architecture:** `.context/SRS/architecture-specs.md`
