/**
 * Centralized environment configuration with validation
 * All environment variables should be accessed through this module
 */

function getEnvVar(name: string, required: boolean = true): string {
  const value = process.env[name];

  if (required && !value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Please check your .env file and ensure ${name} is set.`
    );
  }

  return value || "";
}

// Validate at module load time (fails fast in development)
const config = {
  // Supabase
  supabase: {
    url: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    // Service role key is only available server-side and optional for most operations
    serviceRoleKey: getEnvVar("SUPABASE_SERVICE_ROLE_KEY", false),
  },

  // App
  app: {
    url: getEnvVar("NEXT_PUBLIC_APP_URL", false) || "http://localhost:3000",
    isDev: process.env.NODE_ENV === "development",
    isProd: process.env.NODE_ENV === "production",
  },

  // Web3 (optional)
  web3: {
    walletConnectProjectId: getEnvVar(
      "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID",
      false
    ),
    alchemyApiKey: getEnvVar("NEXT_PUBLIC_ALCHEMY_API_KEY", false),
  },
} as const;

export default config;

// Export individual configs for convenience
export const { supabase: supabaseConfig, app: appConfig, web3: web3Config } = config;
