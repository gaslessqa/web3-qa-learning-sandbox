# Implementation Plan — STORY-W3QA-25: Real-time Tx Status

## Technical Approach
- After tx hash is available, poll for receipt:
  - show pending until receipt
  - then map receipt status → confirmed/reverted
- Provide retry controls and safe cancellation.

## Tasks
1. Create `TxWatcher` utility/component:
   - input: `{ chainId, txHash }`
   - output: `{ state, receipt?, error? }`
2. Implement polling:
   - interval-based polling with a reasonable timeout
   - optional exponential backoff (recommended)
3. UI:
   - `TxStatusPanel` showing state, friendly text, retry action
4. Add `data-testid`:
   - `tx-status-panel`
   - `tx-status-state`
   - `tx-status-retry`
   - `tx-status-error`

## Notes
- Avoid exposing raw RPC errors; translate to learner-friendly messages.
