'use client';

import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmi';

/** Chain IDs explicitly supported by the platform */
const SUPPORTED_CHAIN_IDS = new Set<number>(wagmiConfig.chains.map(c => c.id));

export function NetworkWarning() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  if (!isConnected) return null;
  if (SUPPORTED_CHAIN_IDS.has(chainId)) return null;

  return (
    <div className="bg-yellow-900/80 border-b border-yellow-700/60 text-yellow-100 px-4 py-2.5 text-sm">
      <div className="container mx-auto flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-semibold">Unsupported network detected.</span>
        <span className="text-yellow-200/80">Switch to a supported network to use the labs:</span>
        <div className="flex flex-wrap gap-2">
          {chains.map(chain => (
            <button
              key={chain.id}
              onClick={() => switchChain({ chainId: chain.id })}
              className="px-2.5 py-0.5 rounded bg-yellow-700/60 hover:bg-yellow-600/70 transition text-xs font-medium"
            >
              {chain.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
