import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for highlighting potential problems
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fvcbjkkbzxvdewcbakyr.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Experimental features for Next.js 15
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
