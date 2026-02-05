"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { AuthProvider } from "@/contexts/auth-context";

// Note: Web3 providers (WagmiProvider, RainbowKitProvider) are commented out
// until a WalletConnect Project ID is configured. Uncomment when ready.
// import { WagmiProvider } from "wagmi";
// import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { config as wagmiConfig } from "@/lib/wagmi";
// import "@rainbow-me/rainbowkit/styles.css";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Create QueryClient instance with default options
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/*
        Uncomment Web3 providers when WalletConnect is configured:
        <WagmiProvider config={wagmiConfig}>
          <RainbowKitProvider>
      */}
      <AuthProvider>{children}</AuthProvider>
      {/*
          </RainbowKitProvider>
        </WagmiProvider>
      */}
    </QueryClientProvider>
  );
}
