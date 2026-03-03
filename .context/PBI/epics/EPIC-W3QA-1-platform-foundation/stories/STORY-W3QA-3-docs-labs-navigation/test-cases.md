# Test Cases — STORY-W3QA-3: Docs ↔ Labs Navigation

## Manual Test Cases

### TC-W3QA-3-001 — Client-side navigation
**Steps**
1. Open Home.
2. Click "Docs".
3. Click "Labs".

**Expected**
- Route changes without a full refresh
- No flicker indicating full reload
- URL matches the destination

### TC-W3QA-3-002 — Navigation performance sanity check
**Steps**
1. Open DevTools Performance / Network.
2. Click Docs → Labs multiple times.

**Expected**
- Subsequent navigations should be fast (prefetch helps)
- No repeated heavy loads unnecessarily

## Automation Candidates (Playwright)

### AT-W3QA-3-001 — Route transition smoke
- Click `nav-docs`, assert docs page visible
- Click `nav-labs`, assert labs page visible

### AT-W3QA-3-002 — No hard reload heuristic
- Assert `performance.getEntriesByType('navigation')` does not increment in a way indicating full reload
  (or assert client-side router events / stable app state)
