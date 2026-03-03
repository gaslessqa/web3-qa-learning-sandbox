# STORY-W3QA-4: Wallet State Persistence Across Pages

## User Story
As a user, I want the platform to maintain my wallet connection across pages so that I don't have to reconnect.

## Context
Wallet connection is the foundation for labs and interactive components. If the state resets between pages, the experience becomes frustrating and unreliable.

## Scope
- Mount wagmi provider in the root layout so it survives client-side navigation
- Ensure connected account + chain info remains available across routes during the session
- Clear state only on explicit disconnect or browser close

## Acceptance Criteria
1. After connecting a wallet, navigating between routes keeps the wallet connected.
2. The connected address and network remain visible in the navbar on all pages.
3. No reconnection prompts appear during normal navigation in the same session.
4. State clears on explicit disconnect or browser close.

## Out of Scope
- Persistent login across browser restarts (future)
- Progress tracking tied to wallet identity (future)

## Dependencies
- wagmi context provider in root layout
- Wallet connectivity epic (actual connect/disconnect actions)

## Spec Mapping
- FR-003: Wallet State Persistence Across Pages
