# Implementation Plan — STORY-W3QA-56: MetaMask E2E (Synpress)

## Technical Approach
- Use Synpress to control MetaMask within Playwright.
- Keep tests deterministic:
  - local chain
  - known account seed
  - stable selectors in the app

## Tasks
1. Add Synpress configuration:
   - MetaMask seed phrase for test-only
   - default chain/network settings
2. Add smoke specs:
   - `metamask.connect.spec.ts`
   - `metamask.disconnect.spec.ts`
   - `metamask.account-switch.spec.ts`
   - `metamask.network-switch.spec.ts`
3. Add app selectors:
   - `nav-wallet-cta`, `nav-wallet-address`, `nav-network-badge`
4. Add "runbook" docs:
   - prerequisites
   - common failures and fixes
   - how to inspect traces

## Notes
- Never use real secrets/seed phrases.
- Keep CI execution optional unless the team accepts the maintenance cost.
