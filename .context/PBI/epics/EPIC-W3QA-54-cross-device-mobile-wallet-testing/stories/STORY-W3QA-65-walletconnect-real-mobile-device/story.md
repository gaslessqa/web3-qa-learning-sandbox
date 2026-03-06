# STORY-W3QA-65: WalletConnect on Real Mobile Device (Pairing + Session Persistence)

## User Story
As a learner, I want to test WalletConnect using a real phone, so I can validate pairing, reconnects, and session expiry.

## Context (Theory)
WalletConnect works through a pairing handshake:
- The dApp displays a QR code (or deep link).
- The mobile wallet scans/opens it and approves the connection.
- A session is created and the dApp receives the connected account and chain context.

Real-world QA issues often come from:
- QR scan failures (camera permissions, glare, low brightness)
- Wallet app switching and returning to browser
- session persistence across refresh
- disconnect behavior inconsistencies
- session expiry and reconnect UX
- wrong network or unsupported chain on mobile wallet

## Scope
- Provide a guided, device-based manual test flow for WalletConnect:
  - Pairing via QR
  - Approve connection
  - Verify connected state (address + network)
  - Refresh behavior and session persistence expectations
  - Disconnect from dApp and from wallet
  - Session expiry and reconnect
- Provide a failure-mode checklist and evidence capture guidance.

## Acceptance Criteria
1. The lesson clearly explains WalletConnect pairing and what the dApp should receive (account + chain).
2. Manual steps cover:
   - happy path pairing
   - timeout
   - user cancel/reject
   - refresh behavior
   - disconnect from dApp
   - disconnect from wallet side (revoke session)
3. Includes a "Session States" table:
   - Paired/Connected
   - Pending approval
   - Disconnected
   - Expired
4. Includes bug report evidence checklist:
   - wallet app + version (if available)
   - device OS + browser
   - network/chainId
   - WC method used (QR or deep link)
   - screenshots/video + timestamps
   - tx hash (if a tx was submitted)

## Out of Scope
- Automated device testing at scale (device farms)
- Automating WalletConnect via code (not reliable without device tooling)

## Done Criteria
- Learners can reliably reproduce and report WalletConnect integration issues with high-quality evidence.
