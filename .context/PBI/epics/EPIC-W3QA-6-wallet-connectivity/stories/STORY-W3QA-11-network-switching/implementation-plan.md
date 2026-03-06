# Implementation Plan — STORY-W3QA-11: Network Switching

## Technical Approach
- Maintain a supported networks list in config.
- Use wagmi's chain switching capabilities to request network changes.
- React to chain changes (event-driven) to update UI and dependent components.

## Tasks
1. Create supported networks config:
   - list of `{ chainId, name, icon?, rpc?, explorer? }`
2. Build network selector UI:
   - `data-testid="nav-network-selector"`
   - list items: `data-testid="network-option-<chainId>"`
3. Switching flow:
   - call switch chain hook with chainId
   - handle:
     - success → update UI
     - user reject → show friendly message
     - failure → show recoverable error + retry
4. Unsupported network detection:
   - if chainId not supported → show warning badge and guidance

## Notes
- Avoid exposing raw RPC error strings to beginners.
- Ensure chain changes update any cached "current chain" state used by labs.
