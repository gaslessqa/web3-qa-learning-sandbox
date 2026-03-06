# Test Cases — STORY-W3QA-60: Flaky Control

## Manual Validation
- Confirm retries apply only in CI.
- Confirm traces are available on first retry.
- Confirm quarantine mechanism excludes tests from main gate (but still runs on schedule if desired).

## Automation Validation
- Add a sample flaky test (controlled) to validate quarantine path, then remove.
