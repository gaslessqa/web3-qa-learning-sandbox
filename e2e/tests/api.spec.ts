/**
 * API Smoke Suite — W3QA-61
 * Validates platform API routes and Next.js server responses.
 * No wallet required.
 */
import { test, expect } from '@playwright/test';

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

test.describe('[W3QA-61] API smoke suite', () => {
  test('GET / returns 200', async ({ request }) => {
    const res = await request.get(`${BASE}/`);
    expect(res.status()).toBe(200);
  });

  test('GET /labs returns 200', async ({ request }) => {
    const res = await request.get(`${BASE}/labs`);
    expect(res.status()).toBe(200);
  });

  test('GET /labs/erc20-inspector returns 200', async ({ request }) => {
    const res = await request.get(`${BASE}/labs/erc20-inspector`);
    expect(res.status()).toBe(200);
  });

  test('GET /labs/erc20-approve returns 200', async ({ request }) => {
    const res = await request.get(`${BASE}/labs/erc20-approve`);
    expect(res.status()).toBe(200);
  });

  test('GET /labs/hardhat-counter returns 200', async ({ request }) => {
    const res = await request.get(`${BASE}/labs/hardhat-counter`);
    expect(res.status()).toBe(200);
  });

  test('GET /labs/tx-lifecycle returns 200', async ({ request }) => {
    const res = await request.get(`${BASE}/labs/tx-lifecycle`);
    expect(res.status()).toBe(200);
  });

  test('GET /labs/nonexistent returns 404', async ({ request }) => {
    const res = await request.get(`${BASE}/labs/nonexistent`);
    expect(res.status()).toBe(404);
  });

  test('GET /lessons/connect-disconnect-wallet returns 200', async ({ request }) => {
    const res = await request.get(`${BASE}/lessons/connect-disconnect-wallet`);
    expect(res.status()).toBe(200);
  });

  test('GET /lessons/nonexistent returns 404', async ({ request }) => {
    const res = await request.get(`${BASE}/lessons/nonexistent`);
    expect(res.status()).toBe(404);
  });

  test('Content-Type is text/html for page routes', async ({ request }) => {
    const res = await request.get(`${BASE}/labs`);
    expect(res.headers()['content-type']).toContain('text/html');
  });
});
