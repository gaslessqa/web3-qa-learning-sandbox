'use client';

import { useEffect } from 'react';
import { useAccount, useChainId, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTxMonitor } from '@/contexts/tx-monitor-context';

const SEPOLIA_CHAIN_ID = 11155111;

function Step({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
          {num}
        </span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function TxLifecycleLab() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isOnSepolia = chainId === SEPOLIA_CHAIN_ID;
  const { trackTx } = useTxMonitor();

  const { sendTransaction, data: hash, isPending, error: sendError, reset } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Register tx in global monitor (W3QA-25)
  useEffect(() => {
    if (hash) {
      trackTx(hash, 'Self-transfer (0 ETH)', SEPOLIA_CHAIN_ID);
    }
  }, [hash]);

  function sendSelfTx() {
    if (!address) return;
    reset();
    sendTransaction({ to: address, value: 0n });
  }

  return (
    <div className="space-y-5">
      {/* Step 1: Connect */}
      <Step num={1} title="Connect Wallet">
        <ConnectButton />
        {isConnected && (
          <p className="text-green-400 text-sm mt-3">
            Connected:{' '}
            <span className="font-mono">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </p>
        )}
      </Step>

      {/* Step 2: Switch to Sepolia */}
      <Step num={2} title="Switch to Sepolia">
        {!isConnected ? (
          <p className="text-gray-500 text-sm">Connect a wallet first.</p>
        ) : isOnSepolia ? (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            On Sepolia testnet — ready to proceed
          </div>
        ) : (
          <div className="space-y-2">
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3">
              <p className="text-yellow-300 text-sm">
                You are on chain <span className="font-mono font-bold">{chainId}</span>. Switch to
                Sepolia to continue.
              </p>
            </div>
            <p className="text-gray-400 text-sm">
              Use the network selector in your wallet or the ConnectButton dropdown to switch.
            </p>
          </div>
        )}
        {isConnected && (
          <p className="text-xs text-gray-500 mt-3">
            Need Sepolia ETH? Get it from{' '}
            <a
              href="https://sepoliafaucet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              sepoliafaucet.com
            </a>
          </p>
        )}
      </Step>

      {/* Step 3: Send tx */}
      <Step num={3} title="Send 0 ETH to Self">
        <p className="text-sm text-gray-400 mb-4">
          Sends a transaction with 0 ETH value to your own address. You only pay gas — free on
          Sepolia if you have faucet ETH.
        </p>
        <button
          onClick={sendSelfTx}
          disabled={!isConnected || !isOnSepolia || isPending || isConfirming}
          className="px-5 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {isPending
            ? 'Waiting for wallet...'
            : isConfirming
              ? 'Confirming on-chain...'
              : 'Send Transaction'}
        </button>

        {sendError && (
          <div className="mt-3 bg-red-900/30 border border-red-700 rounded-lg p-3">
            <p className="text-red-300 text-sm">{sendError.message}</p>
          </div>
        )}
      </Step>

      {/* Step 4: Status (W3QA-25, W3QA-26, W3QA-28) */}
      {hash && (
        <Step num={4} title="Track Transaction Status">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Transaction Hash</p>
              <p className="font-mono text-sm text-blue-300 break-all">{hash}</p>
            </div>

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
                  ? 'Confirmed — check the Session Transactions panel below'
                  : isConfirming
                    ? 'Pending — waiting for block inclusion...'
                    : 'Submitted to mempool'}
              </span>
            </div>

            {isSuccess && (
              <a
                href={`https://sepolia.etherscan.io/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm hover:underline block"
              >
                View on Etherscan →
              </a>
            )}

            <div className="bg-gray-900 rounded-lg p-3 text-xs text-gray-400 space-y-1">
              <p className="text-gray-300 font-semibold">QA Observation Points</p>
              <p>• Hash is available immediately after wallet confirms the send</p>
              <p>• Mempool → block inclusion can take seconds to minutes</p>
              <p>• Explorer shows the tx as pending until mined</p>
              <p>• Plain ETH transfers emit no events (empty logs)</p>
            </div>
          </div>
        </Step>
      )}
    </div>
  );
}
