# Implementation Plan — STORY-W3QA-9: Address Display

## Technical Approach
- Use wagmi account hook in navbar component.
- Use a shared formatter utility for consistent truncation.

## Tasks
1. Create `formatAddress(address)` utility:
   - Return `${address.slice(0, 6)}...${address.slice(-4)}`
2. Navbar:
   - When connected, render formatted address
   - `data-testid="nav-wallet-address"`
3. Ensure updates react to account changes:
   - wagmi state should update automatically
4. Add CSS constraints:
   - prevent overflow on small screens

## Notes
- Keep truncation consistent across navbar and labs.
