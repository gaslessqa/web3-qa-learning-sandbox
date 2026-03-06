# Implementation Plan — STORY-W3QA-17: Documentation Search

## Technical Approach
- Build a lightweight search index from MDX metadata + plain text content.
- Use client-side search for MVP (small/medium content volume), with option to move to server/indexed search later.

## Tasks
1. Extract searchable fields from docs content:
   - `title`, `level`, `module`, `path`, `bodyText`
2. Build MVP search utility:
   - normalize text (lowercase, trim)
   - rank title matches higher than body matches
3. Create search UI component:
   - input
   - results list
   - no-results and empty states
4. Add keyboard support:
   - arrow navigation (optional MVP)
   - Enter to open selected result (recommended)
5. Add `data-testid`:
   - `docs-search-input`, `docs-search-results`, `docs-search-no-results`

## Notes
- Debounce input updates to avoid unnecessary re-renders.
- Keep the index generation deterministic and cacheable.
