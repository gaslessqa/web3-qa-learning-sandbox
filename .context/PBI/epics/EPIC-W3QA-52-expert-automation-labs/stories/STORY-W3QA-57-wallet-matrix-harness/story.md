# STORY-W3QA-57: Wallet Matrix Automation Harness

## User Story
As a QA engineer, I want a wallet matrix test harness, so the same tests can run across MetaMask and WalletConnect scenarios.

## Context (Theory)
Cross-wallet testing is a real industry requirement:
- providers behave differently (extension vs WalletConnect session)
- UX and error states differ
- teams often duplicate tests, which is expensive and brittle

A "wallet harness" abstracts:
- connect/disconnect steps
- current account retrieval
- current chain retrieval
so test scenarios can be reused.

## Scope
- Define a wallet adapter interface for tests:
  - connect()
  - disconnect()
  - switchAccount()
  - switchNetwork()
  - getAccount(), getChain()
- Provide at least:
  - MetaMask adapter (Synpress)
  - Mock adapter (CI stable)
- Provide patterns to add WalletConnect adapter later (device-based)

## Acceptance Criteria
1. Test scenarios can be written once and executed with different adapters.
2. Adapters expose consistent return values for assertions.
3. Documentation shows how to add new wallet adapters.

## Out of Scope
- Real mobile WalletConnect adapter automation (EPIC-W3QA-54)

## Done Criteria
- Learners can understand cross-wallet test architecture and avoid duplication.
