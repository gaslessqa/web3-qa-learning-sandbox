# Implementation Plan — STORY-W3QA-47: ERC-20 Approvals & Allowance Lab

## Technical Approach
- Deploy two practice contracts on local chain:
  - ERC-20 token with mint to test accounts
  - Spender contract that calls `transferFrom`
- Build a guided UI that uses:
  - read: balanceOf, allowance
  - write: approve, spenderAction

## Tasks
1. Add practice contract registry entries (token + spender).
2. Build `ApprovalsLab` UI:
   - balance display
   - allowance display
   - approve finite
   - approve max (with warning)
   - revoke allowance
   - spender "use allowance" action
3. Add `data-testid`:
   - `erc20-balance`
   - `erc20-allowance`
   - `erc20-approve`
   - `erc20-approve-max`
   - `erc20-revoke`
   - `erc20-spender-action`

## Notes
- Ensure token decimals are handled correctly (format units for display).
