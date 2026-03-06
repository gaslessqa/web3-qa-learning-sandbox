# STORY-W3QA-59: CI/CD Integration (GitHub Actions + Reports + Artifacts)

## User Story
As a QA engineer, I want automated tests running in GitHub Actions with reports and artifacts, so the team has continuous feedback.

## Context (Theory)
CI/CD is where automation becomes a real quality gate:
- every PR gets feedback
- failures provide artifacts (trace/video/screenshots)
- release readiness can require "green pipeline"

Web3-specific: store artifacts that help debug async failures and state issues.

## Scope
- GitHub Actions workflow for:
  - install + cache
  - build + start app
  - run Playwright smoke
  - upload artifacts (HTML report + traces)
- Optional separate job for contract tests (Hardhat) if available

## Acceptance Criteria
1. CI runs Playwright suite on PRs and main branch.
2. CI uploads HTML report and artifacts.
3. CI clearly fails builds when tests fail.
4. Workflow is documented with troubleshooting notes.

## Out of Scope
- Mandatory Synpress in CI (optional due to volatility)

## Done Criteria
- A working CI pipeline exists and is easy to maintain.
