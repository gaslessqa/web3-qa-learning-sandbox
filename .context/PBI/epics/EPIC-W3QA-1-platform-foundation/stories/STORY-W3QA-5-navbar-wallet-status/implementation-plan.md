# Implementation Plan — STORY-W3QA-5: Navbar Wallet Status

## Technical Approach
- Subscribe to wagmi account + chain hooks in the navbar.
- Apply truncation formatting for addresses.
- Map chainId → network name and supported/unsupported state.

## Tasks
1. Implement `formatAddress(address)` utility:
   - `0x` + first 4 chars + `...` + last 4 chars
2. Implement `getNetworkMeta(chainId)`:
   - returns `{ name, supported, color }`
3. Navbar rendering:
   - if no account: show Connect CTA
   - else: show address + network badge
4. Add `data-testid`:
   - `nav-wallet-cta`, `nav-wallet-address`, `nav-network-badge`

## Done Checklist
- Correct UI states for connected/disconnected
- Clear unsupported network indicator
- data-testid attributes in place for automation
