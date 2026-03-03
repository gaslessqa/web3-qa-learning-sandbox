# STORY-W3QA-5: Navbar Wallet Status Display

## User Story
As a user, I want to see my wallet status in the navbar so that I always know my Web3 context.

## Context
In Web3, users must always know:
- Which account is active
- Which network they are on
- Whether the network is supported for the current experience

## Scope
- Show "Connect Wallet" call-to-action when disconnected
- Show truncated address when connected
- Show network badge with supported/unsupported visual state

## Acceptance Criteria
1. When disconnected: navbar shows a clear "Connect Wallet" CTA.
2. When connected: navbar shows truncated address (e.g., `0x1234...5678`).
3. Navbar displays network name and a visual badge.
4. Unsupported network shows a clear warning state (badge color + message).

## Out of Scope
- Copy-to-clipboard UX (handled in wallet epic if needed)
- Advanced network management (handled in network switching story)

## Dependencies
- wagmi hooks for account and chain state
- Wallet connectivity epic for actual connect/disconnect

## Spec Mapping
- FR-004: Navbar Wallet Status Display
