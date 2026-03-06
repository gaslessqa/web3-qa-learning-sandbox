# Implementation Plan — STORY-W3QA-14: Syntax-Highlighted Code Blocks

## Technical Approach
- Use an MDX-compatible syntax highlighting solution (e.g., rehype/remark plugin or runtime highlighter).
- Style code blocks with a consistent container component.

## Tasks
1. Integrate syntax highlighting into MDX pipeline.
2. Confirm support for:
   - `solidity`
   - `typescript`
   - `javascript`
   - `json` (recommended)
3. Create a `CodeBlock` wrapper style:
   - padding
   - overflow-x auto
   - font-size responsive
4. Add docs examples for Solidity and TypeScript.
5. Add `data-testid`:
   - `mdx-code-block`
   - `mdx-inline-code`

## Notes
- Prioritize SSR-friendly highlighting for performance and consistency.
