# Test Cases — STORY-W3QA-63: RPC Failure Modes Content

## Content QA (Manual)

### TC-W3QA-63-001 — Repro steps are deterministic
**Steps**
1. Follow the lab instructions to simulate:
   - timeout
   - 429 rate limit
   - 5xx error
   - slow response

**Expected**
- Each failure can be triggered reliably
- Recovery path is described (retry, wait, switch RPC)

### TC-W3QA-63-002 — UX expectations are beginner-friendly
**Expected**
- Messages avoid raw JSON-RPC errors
- "What to do next" is always present

### TC-W3QA-63-003 — Automation guidance is concrete
**Expected**
- Shows how to intercept RPC calls in Playwright
- Mentions what not to automate (wallet UI-heavy flows)

## Optional Functional QA (Platform)
- If the platform implements failure toggles:
  - toggles visibly change behavior
  - reset returns system to normal
