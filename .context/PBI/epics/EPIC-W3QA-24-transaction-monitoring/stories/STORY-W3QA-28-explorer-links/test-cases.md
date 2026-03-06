# Test Cases — STORY-W3QA-28: Explorer Links

## Manual Test Cases

### TC-W3QA-28-001 — Explorer link renders for supported network
**Steps**
1. Run on a network with explorer configured (testnet, if used).
2. Submit a tx.
3. Click explorer link.

**Expected**
- Explorer opens to `/tx/<hash>` page for that chain

### TC-W3QA-28-002 — Local chain message
**Steps**
1. Run on local Hardhat chain.
2. Submit a tx.
3. Observe explorer area.

**Expected**
- UI shows "Explorer not available for local chain" (or similar)
- No broken link shown

### TC-W3QA-28-003 — Link not stale across network changes
**Steps**
1. Submit tx on Network A.
2. Switch to Network B.
3. Observe explorer link section for a new tx.

**Expected**
- Links correspond to the correct network and hash
- No stale chain explorer base URL

## Automation Candidates
- Unit test `buildExplorerTxUrl(chainId, hash)` for configured networks
- Mock network config and assert link href formatting
