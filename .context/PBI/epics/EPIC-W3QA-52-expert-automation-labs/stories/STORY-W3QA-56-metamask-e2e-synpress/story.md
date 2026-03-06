# STORY-W3QA-56: MetaMask E2E (Synpress) — Connect/Disconnect + Account/Chain Events

## User Story
As a learner, I want to automate MetaMask flows using Synpress, so I can validate wallet integration end-to-end.

## Context (Theory)
Wallet automation is inherently volatile:
- extension UI changes
- popup timing differences
- RPC latency

Best practice is a minimal E2E "smoke" suite that covers:
- connect wallet
- disconnect
- account switching event handling
- network switching event handling

## Scope
- Synpress setup with Playwright
- A minimal MetaMask suite:
  - connect/disconnect
  - change account (accountsChanged)
  - change network (chainChanged)
- Guidance on what to keep manual vs automate

## Acceptance Criteria
1. A learner can run the MetaMask E2E smoke locally.
2. Tests validate UI state after each wallet action (no stale address/network).
3. Failures produce traces/artifacts useful for debugging.
4. Documentation warns about flakiness and promotes minimal scope.

## Out of Scope
- Full lab flows with complex tx signatures (optional extension)
- Hardware wallet flows

## Done Criteria
- A stable 2–4 test MetaMask smoke suite exists and is maintainable.
