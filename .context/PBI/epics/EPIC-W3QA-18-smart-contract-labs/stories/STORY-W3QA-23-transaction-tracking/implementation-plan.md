# Implementation Plan — STORY-W3QA-23: Transaction Lifecycle

## Technical Approach
- After tx hash is available, poll/wait for receipt.
- Render a state machine:
  - submitted (hash)
  - pending
  - confirmed
  - reverted
- Expose receipt details and logs.

## Tasks
1. Build `TxStatusPanel`:
   - hash display + copy (optional)
   - status badge
   - receipt details table
2. Implement receipt polling/wait:
   - retry interval with backoff (optional MVP)
3. Add explorer link builder:
   - `explorerBaseUrl + /tx/<hash>`
4. Add `data-testid`:
   - `tx-hash`
   - `tx-status-badge`
   - `tx-receipt-details`
   - `tx-error-revert-reason`

## Notes
- Keep messaging beginner-friendly; avoid only showing raw JSON receipts.
