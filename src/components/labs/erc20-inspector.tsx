'use client';

import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { formatUnits, isAddress } from 'viem';
import { ERC20_ABI } from '@/lib/practice-labs';

// Chainlink LINK token on Sepolia — reliably deployed
const DEFAULT_CONTRACT = '0x779877A7B0D9E8603169DdbD7836e478b4624789' as const;
const SEPOLIA_CHAIN_ID = 11155111;

function ReadResult({
  label,
  value,
  isLoading,
  error,
}: {
  label: string;
  value?: string;
  isLoading: boolean;
  error?: Error | null;
}) {
  return (
    <div className="bg-gray-900 rounded-lg p-3">
      <div className="text-xs text-gray-500 mb-1 font-mono">{label}</div>
      {isLoading ? (
        <div className="text-gray-500 text-sm animate-pulse">Loading...</div>
      ) : error ? (
        <div className="text-red-400 text-sm truncate">{error.message}</div>
      ) : value !== undefined ? (
        <div className="text-green-400 font-mono text-sm break-all">{value}</div>
      ) : (
        <div className="text-gray-600 text-sm">—</div>
      )}
    </div>
  );
}

export function Erc20Inspector() {
  const [contractAddress, setContractAddress] = useState<`0x${string}`>(DEFAULT_CONTRACT);
  const [inputAddress, setInputAddress] = useState(DEFAULT_CONTRACT);
  const [balanceInput, setBalanceInput] = useState('');
  const [queriedBalanceAddr, setQueriedBalanceAddr] = useState<`0x${string}` | undefined>();

  const {
    data: name,
    isLoading: nameLoading,
    error: nameError,
  } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: 'name',
    chainId: SEPOLIA_CHAIN_ID,
  });

  const {
    data: symbol,
    isLoading: symbolLoading,
    error: symbolError,
  } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: 'symbol',
    chainId: SEPOLIA_CHAIN_ID,
  });

  const {
    data: decimals,
    isLoading: decimalsLoading,
    error: decimalsError,
  } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    chainId: SEPOLIA_CHAIN_ID,
  });

  const {
    data: totalSupply,
    isLoading: supplyLoading,
    error: supplyError,
  } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: 'totalSupply',
    chainId: SEPOLIA_CHAIN_ID,
  });

  const {
    data: balance,
    isLoading: balanceLoading,
    error: balanceError,
  } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: queriedBalanceAddr ? [queriedBalanceAddr] : undefined,
    chainId: SEPOLIA_CHAIN_ID,
    query: { enabled: !!queriedBalanceAddr },
  });

  const formattedSupply =
    totalSupply !== undefined && decimals !== undefined
      ? formatUnits(totalSupply, decimals)
      : undefined;

  const formattedBalance =
    balance !== undefined && decimals !== undefined ? formatUnits(balance, decimals) : undefined;

  function applyContract() {
    if (isAddress(inputAddress)) {
      setContractAddress(inputAddress as `0x${string}`);
      setQueriedBalanceAddr(undefined);
    }
  }

  function queryBalance() {
    if (isAddress(balanceInput)) {
      setQueriedBalanceAddr(balanceInput as `0x${string}`);
    }
  }

  return (
    <div className="space-y-6">
      {/* Contract address */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-1">Contract Address</h2>
        <p className="text-sm text-gray-400 mb-3">
          Pre-loaded with Chainlink LINK on Sepolia. You can inspect any ERC-20.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputAddress}
            onChange={e => setInputAddress(e.target.value)}
            placeholder="0x..."
            className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={applyContract}
            disabled={!isAddress(inputAddress)}
            className="px-4 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Load
          </button>
        </div>
        <a
          href={`https://sepolia.etherscan.io/address/${contractAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:underline mt-2 inline-block"
        >
          View on Etherscan →
        </a>
      </section>

      {/* View functions — no args */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Token Info (view functions)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ReadResult label="name()" value={name} isLoading={nameLoading} error={nameError} />
          <ReadResult
            label="symbol()"
            value={symbol}
            isLoading={symbolLoading}
            error={symbolError}
          />
          <ReadResult
            label="decimals()"
            value={decimals?.toString()}
            isLoading={decimalsLoading}
            error={decimalsError}
          />
          <ReadResult
            label="totalSupply() — formatted"
            value={
              formattedSupply !== undefined
                ? `${Number(formattedSupply).toLocaleString()} ${symbol ?? ''}`
                : undefined
            }
            isLoading={supplyLoading}
            error={supplyError}
          />
        </div>

        <div className="mt-3 bg-gray-900 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1 font-mono">totalSupply() — raw uint256</div>
          {supplyLoading ? (
            <div className="text-gray-500 text-sm animate-pulse">Loading...</div>
          ) : totalSupply !== undefined ? (
            <div className="text-yellow-400 font-mono text-sm break-all">
              {totalSupply.toString()}
            </div>
          ) : (
            <div className="text-gray-600 text-sm">—</div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Notice how the raw uint256 needs to be divided by 10^decimals to get the human-readable
          value.
        </p>
      </section>

      {/* balanceOf */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-1">balanceOf(address)</h2>
        <p className="text-sm text-gray-400 mb-3">
          Enter any Ethereum address to check its token balance.
        </p>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={balanceInput}
            onChange={e => setBalanceInput(e.target.value)}
            placeholder="0x address..."
            className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={queryBalance}
            disabled={!isAddress(balanceInput)}
            className="px-4 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Query
          </button>
        </div>
        {queriedBalanceAddr && (
          <ReadResult
            label={`balanceOf(${queriedBalanceAddr.slice(0, 10)}...)`}
            value={
              formattedBalance !== undefined
                ? `${Number(formattedBalance).toLocaleString()} ${symbol ?? ''}`
                : undefined
            }
            isLoading={balanceLoading}
            error={balanceError}
          />
        )}
      </section>
    </div>
  );
}
