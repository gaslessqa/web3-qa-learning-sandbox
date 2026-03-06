# Implementation Plan — STORY-W3QA-66: Hardware Wallet QA Checklist

## Suggested Pages
- `/docs/expert/mobile/hardware-wallet-qa-checklist.md`

## Checklist Sections (Recommended)
1. Setup prerequisites (device + firmware + wallet app)
2. Connection discovery (account list, unlock prompts)
3. Signing UX:
   - message signing
   - transaction signing
   - how the dApp should communicate "check your device"
4. Failure modes:
   - device locked / wrong app open
   - USB/Bluetooth disconnect
   - user rejects on device
   - unsupported network/app version
5. Timeout & performance expectations
6. Evidence checklist for bug reports
7. What can still be automated:
   - UI states around the flow
   - mocked provider tests in CI

## Artifacts
- Copy/paste checklist (markdown)
- Bug report template tailored to hardware wallet issues
