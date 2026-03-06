# Implementation Plan — STORY-W3QA-16: Sidebar Navigation

## Technical Approach
- Build a docs navigation tree from content metadata.
- Render a responsive sidebar component with nested items.

## Tasks
1. Create docs tree builder utility from frontmatter:
   - group by level → module → lessons (sorted)
2. Build `DocsSidebar` component (desktop persistent)
3. Build mobile sidebar/drawer variant with toggle
4. Active state highlighting based on current route
5. Keyboard accessibility:
   - focusable toggles
   - `aria-expanded`, `aria-controls`
6. Add `data-testid`:
   - `docs-sidebar`, `docs-sidebar-toggle`, `docs-sidebar-item-active`

## Notes
- Keep the tree generation deterministic to avoid ordering drift.
