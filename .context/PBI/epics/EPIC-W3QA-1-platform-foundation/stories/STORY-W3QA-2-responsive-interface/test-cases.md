# Test Cases — STORY-W3QA-2: Responsive Web Interface

## Manual Test Cases

### TC-W3QA-2-001 — Render at minimum viewport (320px)
**Steps**
1. Open the platform home page.
2. Set viewport to 320x800.
3. Scroll through header/navbar and main content.

**Expected**
- No layout breakage
- No horizontal scroll
- Navigation remains accessible

### TC-W3QA-2-002 — Tablet layout (768px)
**Steps**
1. Set viewport to 768x1024.
2. Navigate to Docs and Labs pages.

**Expected**
- Content readable and not cramped
- Navigation visible or accessible without overlap

### TC-W3QA-2-003 — Desktop layout (1440px)
**Steps**
1. Set viewport to 1440x900.
2. Verify spacing and max-width container behavior.

**Expected**
- Content not stretched excessively
- Layout uses sensible max-width

## Automation Candidates (Playwright)

### AT-W3QA-2-001 — Cross-viewport smoke
- Viewports: 320x800, 375x812, 768x1024, 1024x768, 1440x900
- Assertions:
  - No horizontal overflow (basic heuristic)
  - Navbar visible and main content rendered
  - Core nav links present

### AT-W3QA-2-002 — Keyboard navigation basics
- Tab through navbar elements
- Assert focus visible on interactive items
