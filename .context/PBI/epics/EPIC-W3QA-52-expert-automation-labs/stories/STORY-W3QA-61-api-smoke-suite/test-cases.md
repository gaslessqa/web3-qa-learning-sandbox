# Test Cases — STORY-W3QA-61: API Smoke Suite

## Manual Validation
- Run API smoke tests locally against dev server:
  - health returns 200
  - search returns 200 with expected shape

## Automation Validation
- CI job runs API smoke suite and uploads logs on failure.
