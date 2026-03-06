# EPIC-W3QA-54: Cross-Device & Mobile Wallet Testing

## Summary
Teach real-world wallet coverage beyond desktop extension flows:
- WalletConnect pairing on a real mobile device
- Session persistence/reconnect behavior across reloads
- Cross-device UX and failure states
- Hardware wallet QA checklist (Ledger/Trezor) focusing on constraints and UX

This epic is designed to align with Web3 QA job requirements that mention:
- cross-device testing
- wallet integration testing processes
- hardware wallet familiarity (even if not automated)

## Goals
- Learners can validate WalletConnect flows end-to-end using a real phone.
- Learners understand how WalletConnect sessions behave (pair, approve, disconnect, expire, reconnect).
- Learners can apply a structured QA checklist for hardware wallet signing constraints.
- Content includes evidence guidelines for bug reports (WC session info, screenshots, tx hash, chainId).

## Non-Goals
- Full mobile app QA course for wallet apps (we test the dApp integration, not the wallet app).
- Automated mobile device farms (BrowserStack, etc.) as a requirement.
- Hardware wallet automation.

## In Scope (Stories)
- W3QA-65 WalletConnect on Real Mobile Device (Pairing + Session Persistence)
- W3QA-66 Hardware Wallet QA Checklist (Ledger/Trezor)

## Key Concepts (Theory for Learners)
- WalletConnect bridges a desktop dApp and a mobile wallet via a session handshake.
- Mobile introduces unique failure modes: camera permissions, app switching, session expiry, OS deep links.
- Hardware wallets add signing constraints: user confirmation steps on device, slower flows, and error types.

## Dependencies
- Wallet connectivity epic (WalletConnect option exists)
- Supported networks config (testnet/local where appropriate)
- Tx lifecycle monitoring (for verifying results)
- Documentation framework (MDX + checklists)

## Risks
- Wallet apps differ significantly (MetaMask Mobile, Rainbow, Trust) — content must be wallet-agnostic.
- Some WalletConnect flows change with wallet versions — keep guidance flexible and evidence-focused.
- Hardware wallet availability varies — checklist must be usable even without device access.

## Definition of Done (Epic)
- Both stories published as expert-level docs:
  - Theory
  - Manual QA steps with expected results
  - Failure mode checklist
  - Automation guidance (what's realistic vs not)
  - Evidence checklist for bug reports
