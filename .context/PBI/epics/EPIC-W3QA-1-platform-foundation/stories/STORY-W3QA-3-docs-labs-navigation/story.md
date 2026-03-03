# STORY-W3QA-3: Docs ↔ Labs Navigation

## User Story
As a user, I want to navigate between docs and labs seamlessly so that I can switch between theory and practice.

## Context
Learners switch frequently between reading and doing. Navigation must be fast and must not reset session context.

## Scope
- Provide persistent navigation links for Docs and Labs
- Client-side navigation using Next.js App Router
- Prefetch key routes for faster transitions

## Acceptance Criteria
1. Clicking Docs/Labs navigates without full page reload.
2. URL updates correctly for the target route.
3. Navigation completes quickly (target < 300ms in typical local/staging conditions).
4. Web3 session state is preserved during navigation (no wallet reset).

## Out of Scope
- Advanced routing/filters (handled in docs/labs epics)
- Deep linking to specific lessons (handled in documentation epic)

## Dependencies
- Next.js App Router routing structure
- Global wagmi provider (to avoid state reset)

## Spec Mapping
- FR-002: Navigation Between Docs and Labs
