# Embedded Interactive Components

**Jira Key:** W3QA-15
**Epic:** EPIC-W3QA-12 (Interactive Documentation)
**Priority:** High
**Story Points:** 5
**Status:** To Do

---

## User Story

**As a** learner
**I want to** interact with React components embedded in documentation
**So that** I can practice concepts without leaving the page

---

## Description

MDX documentation should support custom React components that can be embedded inline. These components should have access to wallet context, enabling mini-labs directly within documentation pages.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Wallet demo component

- **Given:** MDX page contains `<WalletDemo />` component
- **When:** Page renders and user is connected
- **Then:** Component shows connected address
- **And:** Component is interactive (can trigger actions)

### Scenario 2: Component handles disconnected state

- **Given:** MDX page contains `<ContractReader />` component
- **When:** User is NOT connected
- **Then:** Component shows "Connect wallet to try this"
- **And:** Component does not error

### Scenario 3: Callout component

- **Given:** MDX contains `<Callout type="warning">`
- **When:** Page renders
- **Then:** Warning callout displays with icon and styling

---

## Technical Notes

### MDX Component Registration

```typescript
// mdx-components.tsx
import { WalletDemo } from '@/components/docs/WalletDemo';
import { ContractReader } from '@/components/docs/ContractReader';
import { Callout } from '@/components/docs/Callout';

export const mdxComponents = {
  WalletDemo,
  ContractReader,
  Callout,
};
```

### Component Example

```tsx
// components/docs/WalletDemo.tsx
'use client';
import { useAccount } from 'wagmi';

export function WalletDemo() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return <div>Connect wallet to see your address</div>;
  }

  return <div>Your address: {address}</div>;
}
```

---

## Dependencies

### Blocked By

- W3QA-14 (Syntax Highlighting)
- W3QA-4 (Wallet State Persistence)

### Blocks

- W3QA-17 (Documentation Search)

---

## Definition of Done

- [ ] Custom components render in MDX
- [ ] Components access wallet context
- [ ] Graceful handling of disconnected state
- [ ] No hydration errors
- [ ] Components are documented

---

## Related Documentation

- **SRS:** `.context/SRS/functional-specs.md` (FR-012)
