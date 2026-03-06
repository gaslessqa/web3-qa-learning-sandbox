# Implementation Plan — STORY-W3QA-19: Load Practice Contract

## Technical Approach
- Maintain a practice contract registry:
  - `{ id, name, chainId, address, abi }`
- Default user flow: select preset → load.
- Advanced flow: manual address + select contract type (ABI).

## Tasks
1. Create `practiceContracts` registry (local JSON/TS module).
2. Build `ContractLoader` component:
   - preset dropdown
   - optional manual entry
   - load button
3. Validate:
   - address format (0x + 40 hex chars)
   - supported chainId
4. Store loaded contract selection in state (context/store) for subsequent lab components.
5. Add `data-testid`:
   - `lab-contract-select`
   - `lab-contract-address-input`
   - `lab-contract-load`
   - `lab-contract-loaded-banner`

## Notes
- Keep the "manual address" path behind an "Advanced" toggle to reduce beginner confusion.
