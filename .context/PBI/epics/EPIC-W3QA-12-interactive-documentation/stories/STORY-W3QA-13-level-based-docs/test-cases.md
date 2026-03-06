# Test Cases — STORY-W3QA-13: Documentation Organized by Level

## Manual Test Cases

### TC-W3QA-13-001 — Level landing pages exist
**Steps**
1. Open documentation home.
2. Navigate to Beginner, Intermediate, and Expert sections.

**Expected**
- Each level page loads successfully
- Each page lists lessons/modules in a clear order

### TC-W3QA-13-002 — Lesson metadata visible
**Steps**
1. Open a lesson from each level.
2. Inspect the lesson header.

**Expected**
- Level label is shown
- Module label is shown
- Estimated time (if included) displays correctly

### TC-W3QA-13-003 — Predictable URLs
**Steps**
1. Open multiple lessons across levels.
2. Compare routes.

**Expected**
- Route structure is consistent (e.g., `/docs/beginner/...`, `/docs/intermediate/...`)

## Automation Candidates (Playwright)
- Assert level links exist and route correctly
- Assert lesson header contains level + module metadata
- Assert no 404s for listed lesson links on level pages
