# Implementation Plan — STORY-W3QA-33: Funded Test Accounts

## Technical Approach
- Rely on Hardhat default accounts and balances.
- Document safe import into MetaMask for local testing.

## Tasks
1. Confirm Hardhat config includes deterministic accounts and balances.
2. Add docs section:
   - "Importing a local account into MetaMask"
   - security warning callout (do not reuse keys)
3. Add a "Reset" section:
   - restart node
   - redeploy contracts

## Notes
- Always label these keys as LOCAL ONLY to prevent misuse.
