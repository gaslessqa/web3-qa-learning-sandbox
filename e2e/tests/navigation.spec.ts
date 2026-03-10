/**
 * Navigation & Static Page Tests — W3QA-55, W3QA-58
 * Tests: page loads, sidebar, breadcrumbs, lab index
 * No wallet required.
 */
import { test, expect } from '@playwright/test';

test.describe('[W3QA-2] Responsive navigation', () => {
  test('home page loads and shows navbar', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Labs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  });

  test('labs index shows all 4 practice labs', async ({ page }) => {
    await page.goto('/labs');
    await expect(page.getByRole('heading', { name: 'ERC-20 Approve Lab' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'ERC-20 Token Inspector' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Hardhat Counter Lab' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Transaction Lifecycle Lab' })).toBeVisible();
  });

  test('lab page renders title and objectives', async ({ page }) => {
    await page.goto('/labs/erc20-inspector');
    await expect(page.getByRole('heading', { name: 'ERC-20 Token Inspector' })).toBeVisible();
    await expect(page.getByText('Learning Objectives')).toBeVisible();
    await expect(page.getByText('Call view functions')).toBeVisible();
  });

  test('lesson page renders MDX content', async ({ page }) => {
    await page.goto('/lessons/connect-disconnect-wallet');
    await expect(page.locator('h1')).toBeVisible();
    // Docs sidebar should be present
    await expect(page.locator('nav[aria-label="Docs sidebar"]')).toBeVisible();
  });

  test('non-existent lab returns 404', async ({ page }) => {
    const response = await page.goto('/labs/does-not-exist');
    expect(response?.status()).toBe(404);
  });
});

test.describe('[W3QA-3] Docs sidebar navigation', () => {
  test('sidebar shows beginner module links', async ({ page }) => {
    await page.goto('/lessons/connect-disconnect-wallet');
    const sidebar = page.locator('nav[aria-label="Docs sidebar"]');
    await expect(sidebar.getByText('Wallet Onboarding')).toBeVisible();
  });

  test('clicking a sidebar link navigates to that lesson', async ({ page }) => {
    await page.goto('/lessons/connect-disconnect-wallet');
    // Click another lesson in the sidebar
    const link = page.locator('nav[aria-label="Docs sidebar"]').getByRole('link').nth(1);
    await link.click();
    await expect(page).toHaveURL(/\/lessons\//);
    await expect(page.locator('h1')).toBeVisible();
  });
});
