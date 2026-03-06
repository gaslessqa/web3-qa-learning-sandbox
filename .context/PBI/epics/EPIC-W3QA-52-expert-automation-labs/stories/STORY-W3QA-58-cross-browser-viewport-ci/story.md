# STORY-W3QA-58: Cross-Browser + Cross-Viewport Test Matrix in CI

## User Story
As a QA engineer, I want cross-browser and responsive tests in CI, so regressions are caught across environments.

## Context (Theory)
Web3 apps frequently fail due to:
- browser differences (extension support, storage behavior)
- responsive issues (wallet badges, long addresses, sidebars)
A basic matrix catches these early.

## Scope
- Define a CI matrix for:
  - browsers: Chromium + Firefox (WebKit optional)
  - viewports: mobile + desktop
- Keep the suite "smoke-level" to avoid long pipelines.

## Acceptance Criteria
1. CI can run smoke tests across at least 2 browsers.
2. CI can run responsive checks across at least 2 viewports.
3. Reports/artifacts are preserved per matrix job.

## Out of Scope
- Full regression suite per matrix (too expensive)
- Extension-based tests across all browsers (limit to Chromium)

## Done Criteria
- Teams can detect cross-environment UI regressions early with minimal runtime cost.
