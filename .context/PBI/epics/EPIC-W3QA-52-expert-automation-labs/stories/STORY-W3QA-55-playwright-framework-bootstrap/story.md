# STORY-W3QA-55: Playwright Framework Bootstrap for dApps

## User Story
As a learner, I want a Playwright framework starter tailored to dApps, so I can scale UI automation with stable patterns.

## Context (Theory)
dApp UI automation requires extra stability patterns:
- deterministic environment (local chain + seeded contracts)
- stable selectors (`data-testid`)
- careful handling of async states (pending tx, loading RPC data)
- trace-based debugging for flaky failures

A good framework bootstrap prevents teams from accumulating unmaintainable tests.

## Scope
- Provide a Playwright baseline:
  - config, test structure, fixtures
  - base URL management
  - tracing/screenshots/video defaults
  - selector strategy guidelines
- Provide sample tests:
  - docs navigation smoke
  - labs page render smoke
  - wallet UI mocked-state test (no extension)

## Acceptance Criteria
1. Framework structure supports scaling (fixtures + page objects/components).
2. Tracing, screenshots, and HTML reports are enabled.
3. A selector strategy is documented (`data-testid` first).
4. Sample tests run reliably in local environment.

## Out of Scope
- Full MetaMask automation (Synpress) — next story
- Mobile wallet automation

## Done Criteria
- Learner can run `npx playwright test` and understand the project structure and artifacts.
