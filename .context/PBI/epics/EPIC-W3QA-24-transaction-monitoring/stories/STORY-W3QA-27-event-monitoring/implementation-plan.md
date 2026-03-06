# Implementation Plan — STORY-W3QA-27: Event Monitoring

## Technical Approach
- Use receipt logs and attempt ABI-based decoding.
- Render events in a collapsible list to handle long argument payloads.

## Tasks
1. Create `TxEventsPanel`:
   - list logs
   - decode with ABI when available
   - fallback rendering for unknown logs
2. Build decoder:
   - input: `{ logs, abi }`
   - output: decoded events with `{ name, args, address }` or fallback with `{ topics, data }`
3. Add `data-testid`:
   - `tx-events-panel`
   - `tx-event-item`
   - `tx-event-fallback`

## Notes
- Always keep a raw fallback path; ABI mismatch should not break the UI.
