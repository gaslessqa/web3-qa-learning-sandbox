"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

/**
 * Creates a Supabase client for use in Client Components
 * This client automatically handles cookie-based auth sessions
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Singleton instance for client-side usage
let browserClient: ReturnType<typeof createClient> | null = null;

export function getClient() {
  if (!browserClient) {
    browserClient = createClient();
  }
  return browserClient;
}
