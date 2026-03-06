# Test Cases — STORY-W3QA-15: Interactive Components in Docs

## Manual Test Cases

### TC-W3QA-15-001 — Embedded component renders
**Steps**
1. Open a lesson with an embedded interactive component.
2. Observe the component area.

**Expected**
- Component renders correctly within the docs page
- Layout is not broken

### TC-W3QA-15-002 — Wallet prerequisite state
**Steps**
1. Open an embedded component that requires wallet connection while disconnected.

**Expected**
- Clear message such as "Connect wallet to use this demo"
- No console crashes

### TC-W3QA-15-003 — Component error isolation
**Steps**
1. Force a known component error in dev/test mode (invalid prop or simulated failure).

**Expected**
- Component area shows fallback/error message
- Rest of docs page remains usable

### TC-W3QA-15-004 — Responsive rendering
**Steps**
1. Open page with embedded component on mobile and desktop viewports.

**Expected**
- Component resizes gracefully
- No overflow outside content container

## Automation Candidates (Playwright)
- Assert embedded component container renders
- Assert wallet-prerequisite message when disconnected (mocked)
- Assert error boundary fallback using a test-only failing component
