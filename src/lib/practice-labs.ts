import { type Abi } from 'viem';

export const ERC20_ABI = [
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    name: 'totalSupply',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const satisfies Abi;

export const COUNTER_ABI = [
  {
    name: 'count',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'owner',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
  },
  {
    name: 'increment',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'decrement',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'reset',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'Incremented',
    type: 'event',
    inputs: [
      { name: 'by', type: 'address', indexed: true },
      { name: 'newCount', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'Decremented',
    type: 'event',
    inputs: [
      { name: 'by', type: 'address', indexed: true },
      { name: 'newCount', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'Reset',
    type: 'event',
    inputs: [{ name: 'by', type: 'address', indexed: true }],
  },
] as const satisfies Abi;

export type LabSlug = 'erc20-approve' | 'erc20-inspector' | 'hardhat-counter' | 'tx-lifecycle';

export type LabDefinition = {
  slug: LabSlug;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate';
  chainId: number;
  networkName: string;
  objectives: string[];
};

export const PRACTICE_LABS: LabDefinition[] = [
  {
    slug: 'erc20-approve',
    title: 'ERC-20 Approve Lab',
    description:
      'Call approve() on a real token, estimate gas before signing, and verify the Approval event on-chain.',
    level: 'intermediate',
    chainId: 11155111,
    networkName: 'Sepolia',
    objectives: [
      'Read current allowance(owner, spender) before acting',
      'Simulate the call to get a gas estimate before signing',
      'Sign and broadcast approve() with your wallet',
      'Verify the Approval event in the transaction logs',
    ],
  },
  {
    slug: 'erc20-inspector',
    title: 'ERC-20 Token Inspector',
    description:
      'Call view functions on a live ERC-20 contract on Sepolia. No wallet required to read.',
    level: 'beginner',
    chainId: 11155111,
    networkName: 'Sepolia',
    objectives: [
      'Call view functions: name(), symbol(), decimals()',
      'Read totalSupply() and format it correctly with decimals',
      'Query balanceOf() for any address',
      'Understand the difference between raw uint256 and formatted values',
    ],
  },
  {
    slug: 'hardhat-counter',
    title: 'Hardhat Counter Lab',
    description:
      'Interact with a Counter contract on your local Hardhat node. No testnet ETH needed — instant confirmations.',
    level: 'intermediate',
    chainId: 31337,
    networkName: 'Hardhat Local',
    objectives: [
      'Start a local Hardhat node and deploy the Counter contract',
      'Connect MetaMask to localhost:8545 (chain 31337)',
      'Read on-chain state: count() and owner()',
      'Call increment(), decrement(), and reset() (access control)',
      'Inspect Incremented / Decremented events in the transaction monitor',
    ],
  },
  {
    slug: 'tx-lifecycle',
    title: 'Transaction Lifecycle Lab',
    description:
      'Send a real Sepolia transaction and observe every phase: pending → confirming → confirmed.',
    level: 'beginner',
    chainId: 11155111,
    networkName: 'Sepolia',
    objectives: [
      'Connect wallet and switch to Sepolia testnet',
      'Send a 0 ETH self-transaction (only gas cost)',
      'Track tx hash, pending state, and block confirmation',
      'Verify the transaction on Etherscan',
    ],
  },
];

export function getLabBySlug(slug: string): LabDefinition | undefined {
  return PRACTICE_LABS.find(l => l.slug === slug);
}
