# Wallet State Persistence

**Jira Key:** W3QA-4
**Epic:** EPIC-W3QA-1 (Platform Foundation)
**Priority:** High
**Story Points:** 5
**Status:** To Do

---

## User Story

**As a** user
**I want to** have my wallet connection maintained across all page navigations
**So that** I don't have to reconnect my wallet every time I switch pages

---

## Description

Once a user connects their wallet, that connection state must persist across all page navigations within the platform. This requires proper setup of wagmi providers at the root layout level, ensuring the React Context wraps the entire application. The wallet state should survive client-side navigation and only reset on explicit disconnect or browser session end.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Wallet persists across navigation

- **Given:** User has connected their wallet on the home page
- **When:** User navigates to `/docs/beginner/wallets`
- **Then:** Wallet remains connected
- **And:** Connected address is displayed in navbar
- **And:** No reconnection prompt appears

### Scenario 2: Wallet persists on page refresh

- **Given:** User has connected their wallet
- **When:** User refreshes the page (F5)
- **Then:** Wallet connection is restored automatically
- **And:** No popup appears in MetaMask

### Scenario 3: State cleared on explicit disconnect

- **Given:** User has connected their wallet
- **When:** User clicks "Disconnect" button
- **Then:** Wallet state is cleared
- **And:** All pages show disconnected state
- **And:** Reconnection requires new user action

### Scenario 4: State cleared on browser close

- **Given:** User has connected their wallet
- **When:** User closes browser completely and reopens
- **Then:** Wallet shows as disconnected
- **And:** User must reconnect manually

---

## Technical Notes

### Frontend

- wagmi provider at root layout level
- Use wagmi's built-in persistence (localStorage)
- RainbowKit for connection UI

### Provider Setup

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}

// components/providers/Web3Provider.tsx
'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';

const queryClient = new QueryClient();

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### wagmi Config

```typescript
// lib/wagmi.ts
import { createConfig, http } from 'wagmi';
import { hardhat, sepolia, mainnet } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [hardhat, sepolia, mainnet],
  connectors: [
    injected(),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID! }),
  ],
  transports: {
    [hardhat.id]: http('http://localhost:8545'),
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
});
```

---

## Dependencies

### Blocked By

- W3QA-2 (Responsive Interface)
- W3QA-3 (Docs/Labs Navigation)

### Blocks

- W3QA-5 (Navbar Wallet Status)
- All wallet-dependent features (EPIC-W3QA-6)

---

## Definition of Done

- [ ] wagmi provider wraps entire application
- [ ] Connection persists across navigation
- [ ] Connection persists on page refresh
- [ ] Disconnect clears state completely
- [ ] No hydration errors in console
- [ ] Unit tests for provider setup
- [ ] E2E tests for persistence

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-W3QA-1-platform-foundation/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-003)
- **Architecture:** `.context/SRS/architecture-specs.md` (Web3 Stack)
