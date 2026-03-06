# Test Cases — STORY-W3QA-16: Sidebar Navigation

## Manual Test Cases

### TC-W3QA-16-001 — Hierarchy rendering
**Steps**
1. Open docs page on desktop.
2. Inspect sidebar structure.

**Expected**
- Levels/modules/lessons are visible in a readable hierarchy

### TC-W3QA-16-002 — Active page highlight
**Steps**
1. Open a lesson from a module.
2. Observe sidebar.

**Expected**
- Current lesson is highlighted
- Parent module/level are clearly visible (expanded or indicated)

### TC-W3QA-16-003 — Mobile collapsible navigation
**Steps**
1. Open docs on mobile viewport.
2. Open sidebar/drawer navigation.
3. Select a lesson link.

**Expected**
- Navigation opens/closes correctly
- Content area remains usable after navigation

### TC-W3QA-16-004 — Keyboard accessibility
**Steps**
1. Use keyboard only (Tab/Enter/Space/Arrow keys if implemented).
2. Expand/collapse modules and open a lesson.

**Expected**
- Sidebar is operable without mouse
- Focus is visible and logical

## Automation Candidates (Playwright)
- Assert sidebar renders and links navigate
- Assert active lesson class/attribute is set
- Mobile: toggle sidebar and click nested link
- Keyboard smoke for focus + expand/collapse
