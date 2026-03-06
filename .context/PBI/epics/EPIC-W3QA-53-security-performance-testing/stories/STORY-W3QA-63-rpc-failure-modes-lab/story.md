# STORY-W3QA-63: RPC Failure Mode Lab (Timeouts, Rate Limits, Retries)

## User Story
As a learner, I want to test RPC failure modes, so the app handles degraded network conditions gracefully.

## Context (Theory)
Most dApp "random failures" are not random:
- RPC timeouts and dropped requests
- rate limiting (429) from public RPCs
- intermittent 5xx errors
- slow responses causing UI race conditions
- user actions during degraded states (double submit)

QA must validate:
- clear error messaging (non-technical)
- retry patterns (with backoff)
- safe UX (no duplicate tx submissions)
- graceful fallbacks (read-only mode, disabled actions)

## Scope
- Teach failure modes and expected UX patterns:
  - timeout
  - rate limit (429)
  - server error (5xx)
  - slow response / latency spike
  - "pending forever" (receipt not found or never mined)
- Provide a deterministic way to simulate failures:
  - test mode toggles OR
  - network interception patterns for automation
- Provide a QA checklist + bug report evidence template.

## Acceptance Criteria
1. Learner can reproduce at least 4 RPC failure modes in a controlled way.
2. UI behavior is documented:
   - what the user sees
   - what actions remain enabled/disabled
   - how retry works
3. Includes an "automation approach" section:
   - Playwright network interception for RPC calls
   - unit tests for retry/backoff logic (if implemented)
4. Includes an "observability" section:
   - browser console
   - request correlation IDs (if available)
   - tx hash + chainId for write flows

## Out of Scope
- Production-scale chaos engineering.
- Building a full RPC proxy service as a product.

## Done Criteria
- Learners can validate resilience and write high-quality bug reports for RPC-related defects.
