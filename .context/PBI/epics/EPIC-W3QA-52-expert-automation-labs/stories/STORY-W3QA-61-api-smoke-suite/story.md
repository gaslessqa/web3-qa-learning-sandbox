# STORY-W3QA-61: API Smoke Suite (Platform Endpoints)

## User Story
As a QA engineer, I want an API smoke suite for platform endpoints, so backend utilities are verified in CI.

## Context (Theory)
Even "frontend-first" Web3 products often depend on APIs:
- content search
- health checks
- utilities (e.g., tx verification helpers)
API smoke tests provide fast confidence and catch breaking changes earlier than UI tests.

## Scope
- Define a minimal API smoke suite:
  - health endpoint
  - docs search endpoint (if server-backed)
  - any contract utilities endpoints (if applicable)
- Run in CI as a fast job.

## Acceptance Criteria
1. Smoke suite validates:
   - expected status codes
   - basic schema of responses
   - basic performance thresholds (sanity)
2. Failures produce useful logs (request/response excerpt, correlation id if any).
3. Runs quickly (< 1–2 minutes).

## Out of Scope
- Full API contract testing (separate epic if needed)
- Load testing at scale (performance epic)

## Done Criteria
- CI can catch broken APIs before UI tests fail.
