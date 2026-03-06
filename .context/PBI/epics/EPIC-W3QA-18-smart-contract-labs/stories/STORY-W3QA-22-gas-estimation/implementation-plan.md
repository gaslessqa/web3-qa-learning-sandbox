# Implementation Plan — STORY-W3QA-22: Gas Estimation

## Technical Approach
- When write function + params are set, run a simulation/estimateGas call.
- Display:
  - estimated gas units
  - optional total cost if gas price is known

## Tasks
1. Add `GasEstimationPanel` used by write flow:
   - loading state
   - success state (gas units + cost)
   - failure state (friendly message)
2. Trigger estimation:
   - debounce input changes
   - cancel previous request if new inputs arrive
3. Add `data-testid`:
   - `gas-estimate-loading`
   - `gas-estimate-value`
   - `gas-estimate-error`

## Notes
- Estimation failure often indicates "would revert" — treat it as a learning signal and show guidance.
