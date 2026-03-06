# Implementation Plan — STORY-W3QA-7: MetaMask Connection

## Technical Approach
- Use RainbowKit for wallet selection modal.
- Use wagmi for connection state management and reactiveness across UI.

## Tasks
1. Add/connect UI entry point:
   - Navbar button: "Connect Wallet"
   - `data-testid="nav-wallet-cta"`
2. Configure wagmi + RainbowKit providers at root layout.
3. Configure connectors:
   - Ensure MetaMask connector is enabled when detected.
4. Error handling:
   - User rejected request → show friendly banner/toast
   - Not installed → show install CTA
   - Locked → show guidance (unlock wallet)
5. Add `data-testid`:
   - `wallet-modal`, `wallet-option-metamask`, `wallet-error-banner`

## Notes
- Detection hints:
  - MetaMask presence can be inferred via EIP-1193 provider existence and MetaMask flag.
- Ensure no unhandled promise rejections are logged.
