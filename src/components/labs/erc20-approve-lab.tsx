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
import { formatUnits, isAddress, parseUnits } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ERC20_ABI } from '@/lib/practice-labs';
import { useTxMonitor } from '@/contexts/tx-monitor-context';

const DEFAULT_CONTRACT = '0x779877A7B0D9E8603169DdbD7836e478b4624789' as const;
const SEPOLIA_CHAIN_ID = 11155111;

export function Erc20ApproveLab() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isOnSepolia = chainId === SEPOLIA_CHAIN_ID;
  const { trackTx } = useTxMonitor();

  const [contractAddress] = useState<`0x${string}`>(DEFAULT_CONTRACT);
  const [spenderInput, setSpenderInput] = useState('');
  const [amountInput, setAmountInput] = useState('1');

  const spender = isAddress(spenderInput) ? (spenderInput as `0x${string}`) : undefined;

  // Token info
  const { data: symbol } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: 'symbol',
    chainId: SEPOLIA_CHAIN_ID,
  });

  const { data: decimals } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    chainId: SEPOLIA_CHAIN_ID,
  });

  // Current allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address && spender ? [address, spender] : undefined,
    chainId: SEPOLIA_CHAIN_ID,
    query: { enabled: !!address && !!spender },
  });

  const parsedAmount = (() => {
    try {
      return decimals !== undefined ? parseUnits(amountInput || '0', decimals) : undefined;
    } catch {
      return undefined;
    }
  })();

  const canSimulate = !!address && !!spender && parsedAmount !== undefined && isOnSepolia;

  // Gas simulation (W3QA-22)
  const {
    data: simulation,
    isLoading: simLoading,
    error: simError,
  } = useSimulateContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: 'approve',
    args: spender && parsedAmount !== undefined ? [spender, parsedAmount] : undefined,
    account: address,
    chainId: SEPOLIA_CHAIN_ID,
    query: { enabled: canSimulate },
  });

  // Write (W3QA-21)
  const { writeContract, data: hash, isPending, error: writeError, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Track tx in global monitor (W3QA-25)
  useEffect(() => {
    if (hash) {
      trackTx(hash, `Approve ${amountInput} ${symbol ?? 'tokens'} → spender`, SEPOLIA_CHAIN_ID);
    }
  }, [hash]);

  // Refetch allowance after confirmation
  useEffect(() => {
    if (isSuccess) refetchAllowance();
  }, [isSuccess, refetchAllowance]);

  function handleApprove() {
    if (!simulation?.request) return;
    reset();
    writeContract(simulation.request);
  }

  const formattedAllowance =
    allowance !== undefined && decimals !== undefined
      ? formatUnits(allowance, decimals)
      : undefined;

  const estimatedGas = simulation?.request?.gas;

  return (
    <div className="space-y-5">
      {/* Step 1: Connect */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
            1
          </span>
          <h2 className="text-lg font-semibold">Connect & Switch to Sepolia</h2>
        </div>
        <ConnectButton />
        {isConnected && !isOnSepolia && (
          <p className="text-yellow-400 text-sm mt-3">Switch to Sepolia to use write functions.</p>
        )}
        {isConnected && isOnSepolia && (
          <p className="text-green-400 text-sm mt-3">Ready on Sepolia.</p>
        )}
      </section>

      {/* Step 2: Configure */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
            2
          </span>
          <h2 className="text-lg font-semibold">Configure Approval</h2>
        </div>

        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Token contract (Sepolia — LINK)
          </label>
          <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-400">
            {contractAddress}
          </div>
          <a
            href={`https://sepolia.etherscan.io/address/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline mt-1 inline-block"
          >
            View on Etherscan →
          </a>
        </div>

        <div>
          <label className="text-xs text-gray-400 block mb-1">Spender address</label>
          <input
            value={spenderInput}
            onChange={e => setSpenderInput(e.target.value)}
            placeholder="0x address to authorize..."
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Tip: use your own address to approve yourself (safe for testing).
          </p>
        </div>

        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Amount to approve ({symbol ?? '…'})
          </label>
          <input
            value={amountInput}
            onChange={e => setAmountInput(e.target.value)}
            type="number"
            min="0"
            step="any"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Current allowance */}
        {formattedAllowance !== undefined && (
          <div className="bg-gray-900 rounded-lg p-3">
            <span className="text-xs text-gray-500 block mb-1">
              Current allowance(you → spender)
            </span>
            <span className="font-mono text-sm text-yellow-300">
              {Number(formattedAllowance).toLocaleString()} {symbol}
            </span>
          </div>
        )}
      </section>

      {/* Step 3: Gas estimation (W3QA-22) */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
            3
          </span>
          <h2 className="text-lg font-semibold">Gas Estimation</h2>
        </div>
        <p className="text-sm text-gray-400 mb-3">
          We simulate the call before you sign. If simulation fails, the real tx would also fail —
          saving you gas.
        </p>
        <div className="bg-gray-900 rounded-lg p-3">
          <span className="text-xs text-gray-500 block mb-1">Estimated gas units</span>
          {!canSimulate ? (
            <span className="text-gray-600 text-sm">Fill in the form and connect to Sepolia</span>
          ) : simLoading ? (
            <span className="text-gray-500 text-sm animate-pulse">Simulating...</span>
          ) : simError ? (
            <span className="text-red-400 text-sm">Simulation failed: {simError.message}</span>
          ) : estimatedGas !== undefined ? (
            <span className="text-green-400 font-mono text-sm">{estimatedGas.toString()} gas</span>
          ) : (
            <span className="text-gray-600 text-sm">—</span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ERC-20 <code className="text-gray-400">approve()</code> typically costs ~46,000 gas.
        </p>
      </section>

      {/* Step 4: Sign & send */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
            4
          </span>
          <h2 className="text-lg font-semibold">Sign & Send</h2>
        </div>

        <button
          onClick={handleApprove}
          disabled={
            !simulation?.request || isPending || isConfirming || !isConnected || !isOnSepolia
          }
          className="px-5 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {isPending
            ? 'Waiting for wallet...'
            : isConfirming
              ? 'Confirming on-chain...'
              : 'Approve'}
        </button>

        {writeError && (
          <div className="mt-3 bg-red-900/30 border border-red-700 rounded-lg p-3">
            <p className="text-red-300 text-sm">{writeError.message}</p>
          </div>
        )}

        {hash && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-500">Transaction Hash</p>
            <p className="font-mono text-sm text-blue-300 break-all">{hash}</p>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  isSuccess
                    ? 'bg-green-400'
                    : isConfirming
                      ? 'bg-yellow-400 animate-pulse'
                      : 'bg-gray-500'
                }`}
              />
              <span className="text-sm">
                {isSuccess
                  ? 'Confirmed — check the Session Transactions panel below for event logs'
                  : isConfirming
                    ? 'Pending...'
                    : 'Submitted'}
              </span>
            </div>
            {isSuccess && (
              <a
                href={`https://sepolia.etherscan.io/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm hover:underline"
              >
                View on Etherscan →
              </a>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
