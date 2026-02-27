// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';

/**
 * Browser Supabase client (singleton).
 * Creating multiple clients in dev/HMR can trigger auth lock AbortError.
 */
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  if (!browserClient) {
    browserClient = createBrowserClient<Database>(url, anonKey);
  }

  return browserClient;
}
