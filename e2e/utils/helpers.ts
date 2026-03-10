/**
 * Shared test helpers for Web3 QA Learning Hub E2E tests.
 * W3QA-55
 */
import { type Page, expect } from '@playwright/test';

/** Truncated address as displayed in the Navbar (0x1234…abcd) */
export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

/**
 * Wait for a transaction hash to appear anywhere on the page
 * (the TxMonitorPanel shows it as `tx: 0x...`)
 */
export async function waitForTxHash(page: Page, timeout = 30_000): Promise<string> {
  const locator = page.locator('text=/tx: 0x[a-fA-F0-9]{64}/');
  await locator.waitFor({ timeout });
  const text = await locator.textContent();
  const match = text?.match(/0x[a-fA-F0-9]{64}/);
  if (!match) throw new Error('Could not extract tx hash from page');
  return match[0];
}

/**
 * Wait for the TxMonitorPanel to show a confirmed row (green dot)
 */
export async function waitForTxConfirmed(page: Page, timeout = 60_000): Promise<void> {
  await page.locator('[data-testid="tx-status-confirmed"]').waitFor({ timeout });
}

/**
 * Navigate to a lab page and assert the heading renders
 */
export async function goToLab(page: Page, slug: string): Promise<void> {
  await page.goto(`/labs/${slug}`);
  await expect(page.locator('h1')).toBeVisible();
}

/**
 * Navigate to a lesson page and assert content loaded
 */
export async function goToLesson(page: Page, slug: string): Promise<void> {
  await page.goto(`/lessons/${slug}`);
  await expect(page.locator('h1')).toBeVisible();
}

/**
 * Assert the ConnectButton is visible and shows the correct state
 */
export async function assertWalletConnected(page: Page, address: string): Promise<void> {
  const truncated = truncateAddress(address);
  await expect(page.getByText(truncated)).toBeVisible();
}

/**
 * Assert the network warning banner is visible when on wrong chain
 */
export async function assertNetworkWarning(page: Page): Promise<void> {
  await expect(page.locator('[data-testid="network-warning"]')).toBeVisible();
}

/**
 * Retry a flaky assertion up to `attempts` times with `delay` ms between.
 * Prefer wagmi polling over this — only use for UI state that lags.
 */
export async function retryAssertion(
  fn: () => Promise<void>,
  attempts = 3,
  delay = 1000
): Promise<void> {
  for (let i = 0; i < attempts; i++) {
    try {
      await fn();
      return;
    } catch (err) {
      if (i === attempts - 1) throw err;
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
