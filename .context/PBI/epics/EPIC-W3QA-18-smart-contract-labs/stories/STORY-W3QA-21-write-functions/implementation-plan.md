# Implementation Plan — STORY-W3QA-21: Write Functions

## Technical Approach
- Use ABI introspection to list nonpayable/payable functions.
- Use a write adapter (wagmi write hooks) to:
  - request signature
  - submit tx
- Store tx hash for lifecycle tracking.

## Tasks
1. ABI utility:
   - filter `stateMutability` in `{ nonpayable, payable }`
2. Build `WriteFunctionPanel`:
   - function selector
   - param inputs
   - execute button
   - status: awaiting signature / submitted / error
3. Add duplicate protection:
   - disable button while awaiting signature and while tx pending
4. Add `data-testid`:
   - `write-fn-select`
   - `write-fn-execute`
   - `write-fn-status`
   - `write-fn-error`

## Notes
- Always show clear state labels. Beginners must know whether they are waiting on the wallet or the chain.
