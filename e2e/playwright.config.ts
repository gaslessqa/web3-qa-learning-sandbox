import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * Web3 QA Learning Hub — Playwright Configuration
 *
 * Covers:
 *  - UI tests against the Next.js dev/staging server
 *  - Wallet E2E with MetaMask extension (Synpress pattern)
 *  - API smoke tests against platform endpoints
 *
 * W3QA-55, W3QA-58, W3QA-59
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './reports/results',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI if wallet state conflicts */
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: './reports/html', open: 'never' }],
    ['junit', { outputFile: './reports/junit.xml' }],
    ['list'],
  ],

  use: {
    /* Base URL for the Next.js app */
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',

    /* Collect trace on first retry for debugging */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on retry (reduces CI storage) */
    video: 'on-first-retry',
  },

  projects: [
    /* === Standard UI tests (no wallet) === */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /(?!.*wallet).*\.spec\.ts/,
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /(?!.*wallet).*\.spec\.ts/,
    },

    /* === Mobile viewport === */
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: /responsive\.spec\.ts/,
    },

    /* === Wallet E2E (MetaMask extension, Chromium only) === */
    {
      name: 'wallet-e2e',
      use: {
        ...devices['Desktop Chrome'],
        // Extension path injected at runtime via METAMASK_PATH env var
        // See: e2e/fixtures/wallet.ts for setup
        channel: 'chrome',
      },
      testMatch: /wallet.*\.spec\.ts/,
    },

    /* === API smoke === */
    {
      name: 'api-smoke',
      testMatch: /api\.spec\.ts/,
    },
  ],

  /* Start Next.js dev server automatically in local runs */
  webServer: process.env.CI
    ? undefined
    : {
        command: 'npm run dev -- --no-turbo',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 60_000,
      },
});
