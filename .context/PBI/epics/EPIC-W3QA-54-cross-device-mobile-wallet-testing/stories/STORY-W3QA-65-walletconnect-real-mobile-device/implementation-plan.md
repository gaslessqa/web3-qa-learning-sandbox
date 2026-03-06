# Implementation Plan — STORY-W3QA-65: WalletConnect Real Device Lesson

## Suggested Pages
- `/docs/expert/mobile/walletconnect-real-device-testing.md`

## Content Sections (Recommended)
1. How WalletConnect works (conceptual)
2. Session states table
3. Manual test flow (QR + deep link if available)
4. Failure modes checklist (camera, app switching, timeout, session expiry)
5. Evidence checklist for bug reports
6. What can be automated vs what should remain manual

## Optional Enhancements (Platform)
- Add a "WalletConnect Debug" panel in dev mode:
  - show session metadata (topic/session id if available)
  - show connected wallet name
  - show last WC event timestamp
- Add clear UI strings for timeout/cancel states (beginner-friendly)
