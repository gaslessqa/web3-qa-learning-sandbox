# Implementation Plan — STORY-W3QA-28: Explorer Links

## Technical Approach
- Build explorer URL using network config:
  - `explorerBaseUrl + "/tx/" + txHash`
- Render link conditionally based on explorer availability.

## Tasks
1. Add `explorerBaseUrl` to supported networks config entries.
2. Implement `buildExplorerTxUrl(chainId, txHash)` helper.
3. Render `TxExplorerLink` component:
   - if explorer exists → show link
   - else → show local-chain message
4. Add `data-testid`:
   - `tx-explorer-link`
   - `tx-explorer-unavailable`

## Notes
- Keep config-driven to support additional chains later without code changes.
