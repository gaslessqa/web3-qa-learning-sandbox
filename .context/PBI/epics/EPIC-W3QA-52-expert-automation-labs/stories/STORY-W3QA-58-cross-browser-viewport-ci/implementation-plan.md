# Implementation Plan — STORY-W3QA-58: Cross-Browser + Viewport Matrix

## Technical Approach
- Use Playwright projects:
  - `chromium-desktop`, `chromium-mobile`
  - `firefox-desktop` (mobile optional)

## Tasks
1. Add Playwright projects in config:
   - define viewports and user agents
2. Mark wallet-extension tests:
   - run only in Chromium (tag: @metamask)
3. Keep CI suite to smoke tests:
   - routing + docs + labs render + basic UI assertions
4. Ensure artifact output folders include project name.
