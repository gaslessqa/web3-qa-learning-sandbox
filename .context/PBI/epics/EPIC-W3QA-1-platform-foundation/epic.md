# EPIC-W3QA-1: Platform Foundation

## Summary
Build the core platform shell required for all learning experiences:
- Responsive UI for desktop/tablet/mobile
- Seamless navigation between Docs and Labs
- Persisted Web3 wallet state across client-side navigation
- Navbar showing wallet + network context

## Goals
- Users can access and use the platform on any device size (min 320px).
- Docs ↔ Labs transitions are fast and do not reset Web3 session state.
- Wallet connection state persists across routes during a browser session.
- Navbar always reflects current wallet + network state.

## Non-Goals
- User accounts, login/password authentication, or progress tracking (post-MVP).
- Advanced automation labs (post-MVP).
- Multi-chain support beyond supported networks list (handled in other epics).

## In Scope (Stories)
- W3QA-2 Responsive Web Interface
- W3QA-3 Docs ↔ Labs Navigation
- W3QA-4 Wallet State Persistence Across Pages
- W3QA-5 Navbar Wallet Status Display

## Dependencies
- Next.js App Router foundation
- Tailwind CSS responsive utilities
- wagmi context mounted in root layout (for state persistence)
- RainbowKit (used later for wallet connection)

## Risks
- UI regressions across breakpoints (needs cross-viewport tests)
- Wallet state being re-initialized on navigation (provider placement risk)
- Navbar showing stale network/account state if hooks not wired properly

## Definition of Done (Epic)
- All 4 stories meet acceptance criteria and validations.
- Basic Playwright smoke suite covers responsive shell + navigation.
- No console errors during navigation between core routes.
- Navbar consistently reflects connected/disconnected state.

## References
- SRS: Functional Specs (FR-001..FR-004)
- NFR: Browser support, accessibility, performance budgets
