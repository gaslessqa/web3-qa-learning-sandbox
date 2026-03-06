# Implementation Plan — STORY-W3QA-15: Interactive Components in Docs

## Technical Approach
- Define an approved MDX component registry for embedded widgets.
- Wrap embedded components in a docs-safe shell with loading/error states.

## Tasks
1. Create MDX component mapping/provider (e.g., `mdx-components.tsx`).
2. Register approved interactive components (e.g., callout demos, wallet status demo, tx state viewer mock).
3. Build a `DocsEmbedShell` wrapper:
   - title/description slot (optional)
   - loading state
   - error boundary fallback
4. Add wallet prerequisite helper UI for wallet-dependent embeds.
5. Add `data-testid`:
   - `docs-embed-shell`
   - `docs-embed-wallet-required`
   - `docs-embed-error`

## Notes
- Keep embedded components lightweight to protect page performance.
- Prefer deterministic demo data for docs, with optional live mode later.
