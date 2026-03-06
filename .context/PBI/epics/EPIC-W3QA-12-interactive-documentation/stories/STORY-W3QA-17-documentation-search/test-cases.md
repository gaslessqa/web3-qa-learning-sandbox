# Test Cases — STORY-W3QA-17: Documentation Search

## Manual Test Cases

### TC-W3QA-17-001 — Search by lesson title
**Steps**
1. Open docs search.
2. Search for a known lesson title (or partial title).

**Expected**
- Relevant lesson appears in results
- Clicking result navigates to correct page

### TC-W3QA-17-002 — Search by keyword in body
**Steps**
1. Search for a term in lesson content (e.g., "gas", "wallet", "chainId").

**Expected**
- Relevant lessons appear even if term is not in the title

### TC-W3QA-17-003 — No results state
**Steps**
1. Search for a random non-existing term.

**Expected**
- Clear "No results" message
- UI remains responsive

### TC-W3QA-17-004 — Empty state
**Steps**
1. Focus search input with no query.

**Expected**
- Default empty state (placeholder or recent/common topics if implemented)
- No error state shown

### TC-W3QA-17-005 — Performance sanity
**Steps**
1. Type a query quickly in search input.
2. Observe input responsiveness.

**Expected**
- No lag or blocking during typing
- Results update within acceptable time for MVP content size

## Automation Candidates (Playwright)
- Search known term → assert results render
- Click result → assert route changes correctly
- Search nonsense term → assert no-results state
- Debounce behavior smoke (if implemented)
