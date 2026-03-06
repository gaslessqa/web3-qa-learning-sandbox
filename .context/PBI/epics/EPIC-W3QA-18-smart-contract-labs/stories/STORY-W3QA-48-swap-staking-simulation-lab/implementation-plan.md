# Implementation Plan — STORY-W3QA-48: Swap/Staking Simulation Lab

## Technical Approach
- Deploy deterministic practice contracts on local chain:
  - SwapRouterMock: checks minOut (slippage) and deadline
  - StakingMock: deposit/withdraw + simple accounting
- UI guides user through parameter selection and shows computed values.

## Tasks
1. Add practice contract registry entries (router + staking + tokens).
2. Build `SwapLab` UI:
   - input amount
   - slippage tolerance
   - minOut calculation display
   - deadline selector
   - execute swap + lifecycle tracking
3. Build `StakingLab` UI:
   - deposit amount
   - withdraw amount
   - show staked balance and wallet balance
4. Add helpful error translation layer:
   - map revert reasons → friendly explanations
5. Add `data-testid`:
   - `swap-amount`
   - `swap-slippage`
   - `swap-deadline`
   - `swap-execute`
   - `stake-deposit`
   - `stake-withdraw`
   - `stake-balance`

## Notes
- Keep math deterministic and transparent so learners can validate expectations.
- Prefer explicit "cause" messaging (slippage/deadline/allowance) over raw RPC errors.
