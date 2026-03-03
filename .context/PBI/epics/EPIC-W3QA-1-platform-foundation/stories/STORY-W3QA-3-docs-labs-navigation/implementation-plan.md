# Implementation Plan — STORY-W3QA-3: Docs ↔ Labs Navigation

## Technical Approach
- Use Next.js App Router `<Link />` for navigation.
- Add prefetch for core routes.
- Ensure navigation component is mounted consistently across routes.

## Tasks
1. Implement navbar links using `<Link href="/docs">` and `<Link href="/labs">`.
2. Add `data-testid`:
   - `nav-docs`, `nav-labs`
3. Verify that layout does not remount wallet providers on navigation.

## Done Checklist
- No full page reload on core navigation
- URL updates correctly
- Navigation feels instant after initial load
