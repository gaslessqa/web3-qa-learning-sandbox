# Implementation Plan — STORY-W3QA-31: Pre-deployed Practice Contracts

## Technical Approach
- Use Hardhat deploy script(s) to deploy all practice contracts.
- Write a registry JSON/TS module consumed by the app.

## Tasks
1. Create `scripts/deploy-local.ts`:
   - deploy contracts
   - seed initial state (optional)
2. Generate registry:
   - `practice-contracts.local.json`
3. Ensure build/compile step runs before deploy.
4. Document:
   - how to run deploy
   - what contracts are included
   - how to reset (restart node + redeploy)

## Notes
- Prefer "registry generation" over hardcoding addresses.
