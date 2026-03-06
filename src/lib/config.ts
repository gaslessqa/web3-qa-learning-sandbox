/**
 * Centralized environment configuration.
 *
 * IMPORTANT: Use static `process.env.NEXT_PUBLIC_*` property access (not dynamic
 * `process.env[name]`) so Next.js can inline the values into the client bundle.
 * Dynamic access (process.env[variable]) is NOT replaced by the bundler and
 * evaluates to undefined on the client, causing runtime errors.
 */

const config = {
  // Supabase — NEXT_PUBLIC_* vars are safe in the client bundle
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    // Service role key is server-side only; never reaches the client bundle
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },

  // App
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
  },

  // Web3 (optional)
  web3: {
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '',
  },
} as const;

export default config;

// Export individual configs for convenience
export const { supabase: supabaseConfig, app: appConfig, web3: web3Config } = config;
