# Implementation Plan — STORY-W3QA-4: Wallet State Persistence

## Technical Approach
- Place wagmi provider (and RainbowKit provider if applicable) in `app/layout.tsx` so it wraps all routes.
- Ensure no nested providers remount on route changes.

## Tasks
1. Create `Web3Providers` component wrapping wagmi configuration.
2. Mount `Web3Providers` in root layout.
3. Add a lightweight `useEffect` sanity log (dev-only) to detect unwanted remounts.
4. Ensure disconnect action clears context state.

## Done Checklist
- Wallet state consistent across route changes
- No provider remount on navigation
