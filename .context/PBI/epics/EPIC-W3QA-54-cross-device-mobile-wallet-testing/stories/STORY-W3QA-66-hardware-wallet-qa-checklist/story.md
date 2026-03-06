# STORY-W3QA-66: Hardware Wallet QA Checklist (Ledger/Trezor)

## User Story
As a QA engineer, I want a hardware wallet testing checklist (Ledger/Trezor), so I can validate signing constraints and UX limitations.

## Context (Theory)
Hardware wallets add strong security, but create unique QA considerations:
- slower signing flow (user must confirm on device)
- limited screen space → truncation of data
- transport issues (USB/Bluetooth)
- app/firmware version constraints
- unsupported operations or networks
- device lock/pin prompts

For dApps, hardware wallet QA focuses on:
- clear instructions and UX
- handling of delays and cancellations
- correct messaging for connection/signing failures
- safe transaction display (recipient + value + network) so user can verify on device

## Scope
- Provide a practical checklist (device-agnostic but mentions Ledger/Trezor examples):
  - prerequisites (firmware/app versions, browser support)
  - connection and account discovery
  - signing flows (message signing and transaction signing)
  - failure modes (device locked, transport issues, user rejects)
  - performance expectations (longer delays)
  - evidence collection for bug reports
- Provide "What not to assume" guidance:
  - hardware wallet UX varies by browser/wallet integration method

## Acceptance Criteria
1. Checklist includes at least 20 actionable validation items.
2. Covers the most common failure modes and expected dApp UX.
3. Includes a timeouts/delay handling section (hardware signing is slower).
4. Includes an evidence checklist for bug reports:
   - device model
   - firmware version
   - wallet app version
   - browser + OS
   - network/chainId
   - tx hash (if submitted)
5. Explicitly states that automation is typically not feasible.

## Out of Scope
- Automating hardware wallet signing
- Deep security analysis of hardware devices

## Done Criteria
- Learners can confidently test a dApp with a hardware wallet and report issues with correct context and evidence.
