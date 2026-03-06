# Implementation Plan — STORY-W3QA-30: Local Hardhat Node

## Technical Approach
- Use `hardhat node` as the canonical entry point.
- Set a clear chainId in Hardhat config.
- Provide a single script command in package.json.

## Tasks
1. Add package scripts:
   - `dev:node` → starts local Hardhat node
2. Ensure Hardhat network config includes:
   - fixed `chainId`
   - deterministic accounts
3. Document:
   - RPC URL
   - chainId
   - expected logs output

## Notes
- Keep defaults beginner-friendly and consistent across OS.
