# Implementation Plan — STORY-W3QA-63: RPC Failure Modes Lab

## Suggested Pages
- `/docs/expert/performance/rpc-failure-modes.md`
- `/docs/expert/performance/retry-backoff-patterns.md`
- `/docs/reference/playbooks/rpc-errors.md` (link to W3QA-39 playbook)

## Suggested Lab Mechanisms (Choose One)

### Option A — Test Mode Toggles (Best for learning)
- Add a UI toggle panel (dev/test only) to simulate:
  - timeout (delay > threshold)
  - 429 response
  - 5xx response
  - slow response
- Apply to read calls and/or gas estimation requests.

### Option B — Automation-first (No product changes)
- Document Playwright route interception patterns:
  - intercept JSON-RPC endpoint calls
  - fulfill with 429/5xx
  - delay responses to simulate slowness

## Artifacts
- RPC failure checklist (markdown)
- Bug report evidence template focused on RPC issues

## Automation Examples (Docs)
- Playwright `page.route()` examples:
  - delay response
  - return 429 / 503
  - simulate malformed JSON-RPC result
