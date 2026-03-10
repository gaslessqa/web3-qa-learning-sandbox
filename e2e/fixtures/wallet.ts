/**
 * MetaMask Wallet Fixture — W3QA-56, W3QA-57
 *
 * Provides a `walletPage` fixture that launches Chromium with MetaMask loaded
 * as an unpacked extension. Follows the Synpress v4 pattern.
 *
 * Usage:
 *   import { test, expect } from '../fixtures/wallet';
 *   test('connects wallet', async ({ page, metamask }) => { ... });
 *
 * Pre-requisites:
 *   METAMASK_PATH=/path/to/metamask-chrome-x.x.x
 *   METAMASK_SEED="twelve word mnemonic..."
 *   METAMASK_PASSWORD=TestPassword123
 *
 * To get MetaMask extension files:
 *   Download from https://github.com/MetaMask/metamask-extension/releases
 *   Extract the .zip into e2e/extensions/metamask/
 */
import { test as base, chromium, type BrowserContext, type Page } from '@playwright/test';
import path from 'path';

export type MetaMaskFixtures = {
  context: BrowserContext;
  metamaskPage: Page;
  page: Page;
};

export const test = base.extend<MetaMaskFixtures>({
  // Launch Chromium with MetaMask extension pre-loaded
  context: async ({}, use) => {
    const extensionPath =
      process.env.METAMASK_PATH ?? path.join(__dirname, '..', 'extensions', 'metamask');

    const context = await chromium.launchPersistentContext('', {
      headless: false, // MetaMask requires headed mode
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
        '--no-sandbox',
      ],
    });

    await use(context);
    await context.close();
  },

  // MetaMask setup page — complete onboarding once per context
  metamaskPage: async ({ context }, use) => {
    // Wait for MetaMask to open its onboarding page
    const mmPage = await context.waitForEvent('page', {
      predicate: p => p.url().includes('chrome-extension'),
      timeout: 10_000,
    });

    await setupMetaMask(mmPage);
    await use(mmPage);
  },

  // Regular app page within the same context (shares MetaMask)
  page: async ({ context, metamaskPage }, use) => {
    const appPage = await context.newPage();
    await use(appPage);
    await appPage.close();
  },
});

/**
 * Complete MetaMask onboarding with a test seed phrase.
 * Adjust selectors to match your MetaMask version.
 */
async function setupMetaMask(page: Page) {
  const seed =
    process.env.METAMASK_SEED ?? 'test test test test test test test test test test test junk';
  const password = process.env.METAMASK_PASSWORD ?? 'TestPassword123!';

  await page.waitForLoadState('domcontentloaded');

  // Click "Import wallet"
  await page.getByTestId('onboarding-import-wallet').click();

  // Agree to terms
  await page.getByTestId('metametrics-i-agree').click();

  // Enter seed phrase words
  const words = seed.split(' ');
  for (let i = 0; i < words.length; i++) {
    await page.getByTestId(`import-srp__srp-word-${i}`).fill(words[i]);
  }
  await page.getByTestId('import-srp-confirm').click();

  // Set password
  await page.getByTestId('create-password-new').fill(password);
  await page.getByTestId('create-password-confirm').fill(password);
  await page.getByTestId('create-password-terms').check();
  await page.getByTestId('create-password-import').click();

  // Finish onboarding
  await page.getByTestId('onboarding-complete-done').click();
  await page.getByTestId('pin-extension-next').click();
  await page.getByTestId('pin-extension-done').click();
}

export { expect } from '@playwright/test';
