# Implementation Plan — STORY-W3QA-26: Transaction Details

## Technical Approach
- Consume watcher state (txHash + receipt).
- Render a detail table with robust formatting for big numbers.

## Tasks
1. Create `TxDetailsPanel`:
   - hash
   - status badge
   - block number
   - gas used
2. Format helpers:
   - `formatHash(hash)` (truncate for display, full on hover/copy optional)
   - `formatBigInt(value)` for gas used
3. Add `data-testid`:
   - `tx-details-hash`
   - `tx-details-block`
   - `tx-details-gas`
   - `tx-details-status`

## Notes
- Ensure details are tied to `{ chainId, txHash }` to avoid stale cross-network display.
