# Implementation Plan — STORY-W3QA-13: Documentation Organized by Level

## Technical Approach
- Use a level-based MDX content hierarchy and frontmatter metadata.
- Generate level landing pages from content metadata.

## Tasks
1. Define content structure convention, e.g.:
   - `content/docs/beginner/...`
   - `content/docs/intermediate/...`
   - `content/docs/expert/...`
2. Define frontmatter schema:
   - `title`, `level`, `module`, `order`, `estimatedTime`
3. Create level index pages that list lessons sorted by `order`.
4. Add `data-testid`:
   - `docs-level-beginner`, `docs-level-intermediate`, `docs-level-expert`
   - `lesson-meta-level`, `lesson-meta-module`

## Notes
- Keep the level taxonomy stable to avoid URL churn.
