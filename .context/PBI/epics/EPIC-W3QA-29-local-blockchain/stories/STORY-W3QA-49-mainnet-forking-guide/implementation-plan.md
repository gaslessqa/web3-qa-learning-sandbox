# Implementation Plan — STORY-W3QA-49: Mainnet Forking Guide

## Technical Approach
- Use Hardhat forking config:
  - `forking: { url, blockNumber }`
- Provide CLI examples and environment variable setup.

## Tasks
1. Add a `fork` script in package.json:
   - `dev:node:fork`
2. Document environment variables:
   - `FORK_RPC_URL`
   - optional `FORK_BLOCK_NUMBER`
3. Add guidance:
   - picking a block number
   - using an archive-capable provider if needed
4. Add troubleshooting:
   - rate limits
   - missing state / archive errors
   - timeouts

## Notes
- Keep fork docs clearly marked as "Advanced QA Debugging".
