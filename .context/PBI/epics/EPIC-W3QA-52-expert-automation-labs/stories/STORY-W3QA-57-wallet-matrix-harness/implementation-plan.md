# Implementation Plan — STORY-W3QA-57: Wallet Matrix Harness

## Technical Approach
- Create a `WalletAdapter` abstraction in the test project:
  - `MockWalletAdapter`
  - `MetaMaskWalletAdapter`

## Tasks
1. Define interface:
   - `connect(page)`
   - `disconnect(page)`
   - `switchNetwork(page, chainId)`
   - `switchAccount(page, index)`
2. Add runner:
   - `describeWalletMatrix([mock, metamask], fn)`
3. Provide example:
   - `wallet.matrix.connect.spec.ts` runs on both adapters
4. Document limitations:
   - WalletConnect real device automation not included here
