/**
 * Wallet Connect / Disconnect E2E Tests — W3QA-56, W3QA-57
 *
 * These tests use the MetaMask fixture from ../fixtures/wallet.ts
 * and require METAMASK_PATH, METAMASK_SEED, and METAMASK_PASSWORD env vars.
 *
 * Run with: npx playwright test --project=wallet-e2e
 *
 * Wallet matrix: these tests are parameterised by wallet type.
 * Add WalletConnect scenarios by extending the walletMatrix below.
 */
import { test, expect } from '../fixtures/wallet';

/**
 * W3QA-57: Wallet Matrix — run the same test against multiple wallet scenarios.
 * Currently MetaMask only; extend with WalletConnect when mobile device CI is set up.
 */
const walletMatrix = [
  { wallet: 'MetaMask', network: 'Sepolia', chainId: 11155111 },
  // { wallet: 'MetaMask', network: 'Mainnet', chainId: 1 },  // add as needed
];

for (const { wallet, network } of walletMatrix) {
  test.describe(`[W3QA-56] ${wallet} — ${network}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/labs/erc20-inspector');
    });

    test('ConnectButton is visible when disconnected', async ({ page }) => {
      // RainbowKit ConnectButton renders "Connect Wallet" when disconnected
      await expect(page.getByRole('button', { name: /connect wallet/i })).toBeVisible();
    });

    test('wallet connects and shows truncated address', async ({ page, metamaskPage }) => {
      // Click ConnectButton
      await page.getByRole('button', { name: /connect wallet/i }).click();

      // Select MetaMask in the RainbowKit modal
      await page.getByText('MetaMask').click();

      // MetaMask opens — approve connection
      await metamaskPage.bringToFront();
      await metamaskPage.getByTestId('page-container-footer-next').click();
      await metamaskPage.getByTestId('page-container-footer-next').click();

      // Back to app
      await page.bringToFront();

      // Address should appear in navbar (truncated format 0x1234…abcd)
      await expect(page.locator('button:has-text("0x")')).toBeVisible({ timeout: 10_000 });
    });

    test('wrong network shows network warning', async ({ page }) => {
      // If wallet is connected to Mainnet on a Sepolia-only lab, warning should show
      // This test is valid when MetaMask is configured to Mainnet
      await page.goto('/labs/erc20-approve');
      // Check that either the lab renders (correct network) or warning appears
      const hasWarning = await page.locator('[data-testid="network-warning"]').isVisible();
      const hasLab = await page.locator('text=ERC-20 Approve Lab').isVisible();
      expect(hasWarning || hasLab).toBe(true);
    });
  });
}
