# Implementation Plan — STORY-W3QA-8: WalletConnect Support

## Technical Approach
- Enable WalletConnect connector through RainbowKit/wagmi.
- Configure WalletConnect project settings (projectId) via env variables.

## Tasks
1. Add WalletConnect connector in wagmi config.
2. Provide WalletConnect projectId configuration (env var).
3. Ensure modal shows WalletConnect option:
   - `data-testid="wallet-option-walletconnect"`
4. Handle pairing lifecycle states:
   - waiting for scan/approval
   - timeout
   - cancel/reject
   - connected
5. Add user-friendly messages and retry button.

## Notes
- Keep messages beginner-friendly: avoid raw RPC errors.
- Log technical errors in console only in dev mode (optional).
