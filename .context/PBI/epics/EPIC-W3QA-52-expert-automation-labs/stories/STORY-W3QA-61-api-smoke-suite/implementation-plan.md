# Implementation Plan — STORY-W3QA-61: API Smoke Suite

## Technical Approach
- Use Playwright APIRequestContext or a lightweight test runner (Node + fetch) in the same test project.

## Tasks
1. Create `tests/api/` suite:
   - `health.spec.ts`
   - `search.spec.ts`
2. Define env var:
   - `API_BASE_URL`
3. Assertions:
   - status code
   - minimal schema checks (presence of fields)
   - response time sanity threshold
4. Wire into CI:
   - separate job or same job before UI tests
