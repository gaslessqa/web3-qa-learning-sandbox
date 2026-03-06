# Implementation Plan — STORY-W3QA-20: Read Functions

## Technical Approach
- Use ABI introspection to list read-only functions.
- Execute calls through a consistent adapter (wagmi read hooks or a client wrapper).
- Render results with a formatter that can handle:
  - primitives
  - bigints
  - arrays
  - tuples/struct-like outputs

## Tasks
1. Create ABI utility:
   - filter `stateMutability` in `{ view, pure }`
2. Build `ReadFunctionPanel`:
   - function selector
   - param inputs
   - call button
   - result display + error display
3. Add formatters:
   - bigint formatting
   - address checksum display (optional)
4. Add `data-testid`:
   - `read-fn-select`
   - `read-fn-call`
   - `read-fn-result`
   - `read-fn-error`

## Notes
- Prefer deterministic outputs for practice contracts (e.g., known initial state).
