# Connected Address Display

**Jira Key:** W3QA-9
**Epic:** EPIC-W3QA-6 (Wallet Connectivity)
**Priority:** High
**Story Points:** 2
**Status:** To Do

---

## User Story

**As a** user
**I want to** see my connected wallet address in truncated format
**So that** I know which account is active without seeing the full address

---

## Description

When connected, the wallet address should display in a truncated format (0x1234...5678) for readability. The full address should be available via hover tooltip or click-to-copy functionality.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Address displays truncated

- **Given:** User is connected with address `0xAbCdEf1234567890AbCdEf1234567890AbCdEf12`
- **When:** User views the navbar
- **Then:** Address displays as `0xAbCd...Ef12`
- **And:** Format is always 13 characters (0x + 4 + ... + 4)

### Scenario 2: Hover shows full address

- **Given:** User sees truncated address in navbar
- **When:** User hovers over the address
- **Then:** Tooltip shows full address

### Scenario 3: Click copies full address

- **Given:** User sees truncated address
- **When:** User clicks on the address
- **Then:** Full address is copied to clipboard
- **And:** Toast notification confirms "Copied!"

---

## Technical Notes

### Address Formatting

```typescript
export function truncateAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
```

### Copy to Clipboard

```typescript
async function copyAddress(address: string) {
  await navigator.clipboard.writeText(address);
  toast.success('Address copied!');
}
```

---

## Dependencies

### Blocked By

- W3QA-7 (MetaMask Connection)

### Blocks

- None

---

## Definition of Done

- [ ] Address truncates correctly
- [ ] Tooltip shows full address
- [ ] Copy to clipboard works
- [ ] Unit tests for truncation
- [ ] Works for all valid addresses

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-W3QA-6-wallet-connectivity/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-007)
