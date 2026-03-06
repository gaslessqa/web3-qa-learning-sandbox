import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import config from './config';

const hardhatLocal = {
  id: 31337,
  name: 'Hardhat Local',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['http://127.0.0.1:8545'] } },
} as const;

export const wagmiConfig = getDefaultConfig({
  appName: 'Web3 QA Learning Hub',
  projectId: config.web3.walletConnectProjectId,
  chains: [mainnet, sepolia, hardhatLocal],
  ssr: true,
});

// providers.tsx imports it as "config", so re-export
export { wagmiConfig as config };
