'use client';

import { useEffect, useState } from 'react';
import {
  useAccount,
  useChainId,
  useReadContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { isAddress } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { COUNTER_ABI } from '@/lib/practice-labs';
import { useTxMonitor } from '@/contexts/tx-monitor-context';

const HARDHAT_CHAIN_ID = 31337;

export function HardhatCounterLab() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isOnHardhat = chainId === HARDHAT_CHAIN_ID;
  const { trackTx } = useTxMonitor();

  const [addressInput, setAddressInput] = useState('');
  const [contractAddress, setContractAddress] = useState<`0x${string}` | undefined>();
  const [lastAction, setLastAction] = useState('');

  const enabled = !!contractAddress;

  // Read count — auto-refresh every 3s (local node is instant)
  const { data: count, refetch: refetchCount } = useReadContract({
    address: contractAddress,
    abi: COUNTER_ABI,
    functionName: 'count',
    chainId: HARDHAT_CHAIN_ID,
    query: { enabled, refetchInterval: 3000 },
  });

  const { data: owner } = useReadContract({
    address: contractAddress,
    abi: COUNTER_ABI,
    functionName: 'owner',
    chainId: HARDHAT_CHAIN_ID,
    query: { enabled },
  });

  const isOwner =
    address && owner ? address.toLowerCase() === (owner as string).toLowerCase() : false;

  // Simulate each action for gas check + request object
  const { data: simIncrement } = useSimulateContract({
    address: contractAddress,
    abi: COUNTER_ABI,
    functionName: 'increment',
    account: address,
    chainId: HARDHAT_CHAIN_ID,
    query: { enabled: enabled && !!address && isOnHardhat },
  });

  const { data: simDecrement } = useSimulateContract({
    address: contractAddress,
    abi: COUNTER_ABI,
    functionName: 'decrement',
    account: address,
    chainId: HARDHAT_CHAIN_ID,
    query: { enabled: enabled && !!address && isOnHardhat && count !== undefined && count > 0n },
  });

  const { data: simReset } = useSimulateContract({
    address: contractAddress,
    abi: COUNTER_ABI,
    functionName: 'reset',
    account: address,
    chainId: HARDHAT_CHAIN_ID,
    query: { enabled: enabled && !!address && isOnHardhat && !!isOwner },
  });

  const {
    writeContract,
    data: hash,
    isPending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (hash && lastAction) trackTx(hash, lastAction, HARDHAT_CHAIN_ID);
  }, [hash]);

  useEffect(() => {
    if (isSuccess) refetchCount();
  }, [isSuccess, refetchCount]);

  function handleWrite(
    sim: { request: Parameters<typeof writeContract>[0] } | undefined,
    label: string
  ) {
    if (!sim?.request) return;
    resetWrite();
    setLastAction(label);
    writeContract(sim.request);
  }

  function applyAddress() {
    if (isAddress(addressInput)) setContractAddress(addressInput as `0x${string}`);
  }

  return (
    <div className="space-y-5">
      {/* Prerequisites */}
      <div className="bg-gray-800 border border-yellow-700/50 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-yellow-400 mb-3">Prerequisites</h2>
        <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
          <li>
            <code className="text-green-400 bg-gray-900 px-1.5 py-0.5 rounded text-xs">
              cd hardhat && npm install
            </code>
          </li>
          <li>
            Start local node:{' '}
            <code className="text-green-400 bg-gray-900 px-1.5 py-0.5 rounded text-xs">
              npm run node
            </code>{' '}
            (keep terminal open)
          </li>
          <li>
            Deploy contracts:{' '}
            <code className="text-green-400 bg-gray-900 px-1.5 py-0.5 rounded text-xs">
              npm run deploy
            </code>
          </li>
          <li>
            Import a Hardhat private key into MetaMask and add network localhost:8545 / chain 31337
          </li>
        </ol>
        <p className="text-xs text-gray-500 mt-3">
          See the <strong>Local Blockchain Setup</strong> lesson for step-by-step instructions.
        </p>
      </div>

      {/* Step 1: Connect */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
            1
          </span>
          <h2 className="text-lg font-semibold">Connect to Hardhat Local</h2>
        </div>
        <ConnectButton />
        {isConnected && !isOnHardhat && (
          <div className="mt-3 bg-yellow-900/30 border border-yellow-700 rounded-lg p-3">
            <p className="text-yellow-300 text-sm">
              Switch to Hardhat Local (chain 31337) in MetaMask.
            </p>
          </div>
        )}
        {isConnected && isOnHardhat && (
          <p className="text-green-400 text-sm mt-2">Connected to Hardhat Local.</p>
        )}
      </section>

      {/* Step 2: Load contract */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
            2
          </span>
          <h2 className="text-lg font-semibold">Load Counter Contract</h2>
        </div>
        <p className="text-sm text-gray-400 mb-3">
          Paste the Counter address from{' '}
          <code className="text-green-400 bg-gray-900 px-1 rounded text-xs">npm run deploy</code>{' '}
          output.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={addressInput}
            onChange={e => setAddressInput(e.target.value)}
            placeholder="0x..."
            className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={applyAddress}
            disabled={!isAddress(addressInput)}
            className="px-4 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Load
          </button>
        </div>
      </section>

      {/* Step 3: Interact */}
      {contractAddress && (
        <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
              3
            </span>
            <h2 className="text-lg font-semibold">Read & Write</h2>
          </div>

          {/* Count display */}
          <div className="bg-gray-900 rounded-xl p-6 text-center mb-5">
            <p className="text-xs text-gray-500 mb-1">count()</p>
            <p className="text-6xl font-bold font-mono text-white">
              {count !== undefined ? count.toString() : '—'}
            </p>
            <p className="text-xs text-gray-600 mt-2">auto-refreshes every 3s</p>
          </div>

          {/* Owner */}
          {owner && (
            <div className="bg-gray-900 rounded-lg p-3 mb-5 text-xs">
              <span className="text-gray-500 block mb-0.5">owner()</span>
              <span className="font-mono text-gray-400 break-all">
                {owner as string}{' '}
                {isOwner && <span className="text-green-400 font-semibold">(you)</span>}
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap mb-4">
            <button
              onClick={() => handleWrite(simIncrement, 'Counter: increment()')}
              disabled={!simIncrement?.request || isPending || isConfirming || !isOnHardhat}
              className="px-5 py-2.5 bg-green-700 rounded-lg text-sm font-medium hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              + Increment
            </button>
            <button
              onClick={() => handleWrite(simDecrement, 'Counter: decrement()')}
              disabled={
                !simDecrement?.request || isPending || isConfirming || !isOnHardhat || count === 0n
              }
              className="px-5 py-2.5 bg-red-800 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              − Decrement
            </button>
            {isOwner && (
              <button
                onClick={() => handleWrite(simReset, 'Counter: reset()')}
                disabled={!simReset?.request || isPending || isConfirming || !isOnHardhat}
                className="px-5 py-2.5 bg-gray-600 rounded-lg text-sm font-medium hover:bg-gray-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                ↺ Reset (owner only)
              </button>
            )}
          </div>

          {/* Tx status */}
          {hash && (
            <div className="space-y-1.5 mt-2">
              <p className="font-mono text-xs text-blue-300 break-all">tx: {hash}</p>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${isSuccess ? 'bg-green-400' : isConfirming ? 'bg-yellow-400 animate-pulse' : 'bg-gray-500'}`}
                />
                <span className="text-sm text-gray-400">
                  {isPending
                    ? 'Waiting for wallet...'
                    : isConfirming
                      ? 'Confirming...'
                      : isSuccess
                        ? 'Confirmed — check Session Transactions below'
                        : ''}
                </span>
              </div>
            </div>
          )}

          {writeError && (
            <div className="mt-3 bg-red-900/30 border border-red-700 rounded-lg p-3">
              <p className="text-red-300 text-sm">{writeError.message}</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
