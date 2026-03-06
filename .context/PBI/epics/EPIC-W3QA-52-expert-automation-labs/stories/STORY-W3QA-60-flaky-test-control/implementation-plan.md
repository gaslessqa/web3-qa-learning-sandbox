# Implementation Plan — STORY-W3QA-60: Flaky Test Control

## Technical Approach
- Use Playwright tags and config rules:
  - retries in CI (`process.env.CI`)
  - quarantine tag like `@quarantine`
- Provide documentation + templates.

## Tasks
1. Update Playwright config:
   - `retries: CI ? 2 : 0`
   - `trace: "on-first-retry"`
2. Add tagging conventions:
   - `@smoke`, `@regression`, `@metamask`, `@quarantine`
3. Add "Flaky Triage Checklist" docs:
   - confirm determinism (local chain)
   - replace time-based waits
   - stabilize selectors
   - reduce suite scope
4. Optional scheduled workflow:
   - run quarantine tests nightly for visibility
