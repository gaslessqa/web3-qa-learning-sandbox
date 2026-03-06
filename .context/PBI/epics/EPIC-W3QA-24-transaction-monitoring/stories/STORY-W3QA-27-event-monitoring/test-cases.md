# Test Cases — STORY-W3QA-27: Event Monitoring

## Manual Test Cases

### TC-W3QA-27-001 — Decoded event display
**Steps**
1. Execute a tx that emits an event (practice contract).
2. Open Events section.

**Expected**
- Event name displayed
- Args displayed with labels
- Contract address displayed

### TC-W3QA-27-002 — Multiple events
**Steps**
1. Execute a tx that emits multiple events.
2. Open Events section.

**Expected**
- All events listed in order
- UI remains readable (collapsible items recommended)

### TC-W3QA-27-003 — Unknown/ABI-mismatch logs fallback
**Steps**
1. Load a contract with missing/incorrect ABI (test mode) or simulate unknown logs.
2. Open Events section.

**Expected**
- Fallback shows topics/data safely
- No crash

### TC-W3QA-27-004 — Mobile layout
**Steps**
1. View events on mobile viewport.

**Expected**
- No horizontal overflow beyond component container (scroll allowed inside)
- Data remains readable

## Automation Candidates
- Mock receipt logs and assert:
  - decoded display for known ABI
  - fallback display for unknown logs
