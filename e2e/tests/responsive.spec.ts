/**
 * Responsive / Mobile Viewport Tests — W3QA-58
 * Runs on mobile-chrome project (Pixel 5 viewport)
 */
import { test, expect } from '@playwright/test';

test.describe('[W3QA-58] Mobile viewport', () => {
  test('home page renders on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
    // Ensure nothing overflows horizontally
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width ?? 393;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // 1px tolerance
  });

  test('labs index scrolls without overflow on mobile', async ({ page }) => {
    await page.goto('/labs');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width ?? 393;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test('lab detail page renders objectives on mobile', async ({ page }) => {
    await page.goto('/labs/erc20-inspector');
    await expect(page.getByText('Learning Objectives')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });

  test('lesson page sidebar is accessible on mobile', async ({ page }) => {
    await page.goto('/lessons/connect-disconnect-wallet');
    // On mobile the sidebar should still be in the DOM (scrollable)
    await expect(page.locator('nav[aria-label="Docs sidebar"]')).toBeAttached();
  });
});
