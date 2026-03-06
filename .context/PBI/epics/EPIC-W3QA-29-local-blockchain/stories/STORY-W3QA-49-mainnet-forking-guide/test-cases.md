# Test Cases — STORY-W3QA-49: Mainnet Forking Guide

## Manual Test Cases

### TC-W3QA-49-001 — Fork node starts with pinned block
**Steps**
1. Set RPC URL in env.
2. Start fork node with a specific block number.

**Expected**
- Node starts successfully
- `eth_blockNumber` returns the expected pinned block (or begins from it)

### TC-W3QA-49-002 — Read interaction against mainnet contracts on fork
**Steps**
1. Use a known contract address (e.g., popular token) in read mode.
2. Call a read function.

**Expected**
- Returns realistic data without errors

### TC-W3QA-49-003 — Troubleshooting guidance works
**Steps**
1. Trigger rate limit (low tier RPC).
2. Use troubleshooting section.

**Expected**
- User can resolve by adjusting provider, caching, or block selection guidance

## Automation Candidates
- Optional script:
  - start fork node (CI may skip due to key requirement)
  - call `eth_chainId` and `eth_blockNumber`
