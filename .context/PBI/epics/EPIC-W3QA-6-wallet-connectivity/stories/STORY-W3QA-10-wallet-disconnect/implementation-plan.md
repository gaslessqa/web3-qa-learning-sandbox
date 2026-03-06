# Implementation Plan — STORY-W3QA-10: Wallet Disconnect

## Technical Approach
- Use wagmi disconnect hook to clear connection state.
- Clear any app-side cached state used to restore sessions.

## Tasks
1. Add Disconnect action to connected wallet UI:
   - `data-testid="nav-wallet-disconnect"`
2. On disconnect:
   - call disconnect hook
   - clear local/session storage keys (if used)
   - reset any wallet-dependent UI state in memory
3. Ensure UI updates instantly:
   - CTA returns
   - address/network removed

## Notes
- If session persistence across refresh is later added, ensure disconnect explicitly clears it.
