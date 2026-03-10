'use client';

import { useState } from 'react';
import { useTransactionReceipt, useWaitForTransactionReceipt } from 'wagmi';
import { parseEventLogs, type Abi } from 'viem';
import { useTxMonitor, type TrackedTx } from '@/contexts/tx-monitor-context';

const ERC20_EVENTS_ABI = [
  {
    name: 'Transfer',
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'Approval',
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
  },
] as const satisfies Abi;

function explorerUrl(chainId: number, hash: string) {
  if (chainId === 1) return `https://etherscan.io/tx/${hash}`;
  if (chainId === 11155111) return `https://sepolia.etherscan.io/tx/${hash}`;
  if (chainId === 31337) return null; // local — no explorer
  return `https://etherscan.io/tx/${hash}`;
}

function EventLogViewer({ hash, chainId }: { hash: `0x${string}`; chainId: number }) {
  const { data: receipt, isLoading } = useTransactionReceipt({ hash, chainId });

  if (isLoading)
    return <p className="text-gray-500 text-xs py-1 animate-pulse">Loading receipt...</p>;
  if (!receipt) return <p className="text-gray-600 text-xs py-1">Pending...</p>;

  let decoded: ReturnType<typeof parseEventLogs> = [];
  try {
    decoded = parseEventLogs({ abi: ERC20_EVENTS_ABI, logs: receipt.logs });
  } catch {
    // ignore
  }

  return (
    <div className="space-y-2 mt-2">
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-gray-900 rounded p-2">
          <span className="text-gray-500 block">Block</span>
          <span className="font-mono text-green-400">#{receipt.blockNumber.toString()}</span>
        </div>
        <div className="bg-gray-900 rounded p-2">
          <span className="text-gray-500 block">Gas used</span>
          <span className="font-mono text-green-400">{receipt.gasUsed.toString()}</span>
        </div>
        <div className="bg-gray-900 rounded p-2">
          <span className="text-gray-500 block">Status</span>
          <span
            className={`font-mono ${receipt.status === 'success' ? 'text-green-400' : 'text-red-400'}`}
          >
            {receipt.status}
          </span>
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-1">
          Events ({receipt.logs.length} log{receipt.logs.length !== 1 ? 's' : ''})
        </p>
        {decoded.length > 0 ? (
          decoded.map((event, i) => (
            <div key={i} className="bg-gray-900 rounded p-2 mb-1">
              <span className="text-xs font-semibold text-blue-400 block mb-1">
                {event.eventName}
              </span>
              <pre className="text-xs text-gray-300 whitespace-pre-wrap break-all">
                {JSON.stringify(
                  Object.fromEntries(
                    Object.entries(event.args ?? {}).map(([k, v]) => [
                      k,
                      typeof v === 'bigint' ? v.toString() : v,
                    ])
                  ),
                  null,
                  2
                )}
              </pre>
            </div>
          ))
        ) : receipt.logs.length > 0 ? (
          receipt.logs.map((log, i) => (
            <div key={i} className="bg-gray-900 rounded p-2 mb-1">
              <span className="text-xs text-gray-500 block mb-1">Log {i} (raw)</span>
              <pre className="text-xs text-gray-400 whitespace-pre-wrap break-all">
                {JSON.stringify({ address: log.address, topics: log.topics }, null, 2)}
              </pre>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-600">No logs emitted</p>
        )}
      </div>
    </div>
  );
}

function TxRow({ tx }: { tx: TrackedTx }) {
  const [expanded, setExpanded] = useState(false);
  const {
    isLoading: isPending,
    isSuccess,
    isError,
  } = useWaitForTransactionReceipt({
    hash: tx.hash,
    chainId: tx.chainId,
  });
  const url = explorerUrl(tx.chainId, tx.hash);

  return (
    <div className="border-t border-gray-700/50 first:border-t-0">
      <div
        className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-700/30 cursor-pointer"
        onClick={() => isSuccess && setExpanded(e => !e)}
      >
        <span
          className={`w-2 h-2 rounded-full shrink-0 ${
            isSuccess ? 'bg-green-400' : isError ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'
          }`}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-200 truncate">{tx.label}</p>
          <p className="text-xs text-gray-500 font-mono">
            {tx.hash.slice(0, 10)}...{tx.hash.slice(-6)}
          </p>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
            isSuccess
              ? 'bg-green-900/60 text-green-300'
              : isError
                ? 'bg-red-900/60 text-red-300'
                : 'bg-yellow-900/60 text-yellow-300'
          }`}
        >
          {isSuccess ? 'confirmed' : isError ? 'failed' : 'pending'}
        </span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-xs text-blue-400 hover:underline shrink-0"
          >
            Etherscan →
          </a>
        )}
        {isSuccess && (
          <span className="text-xs text-gray-500 shrink-0">{expanded ? '▲' : '▼'}</span>
        )}
      </div>

      {expanded && isSuccess && (
        <div className="px-4 pb-3">
          <EventLogViewer hash={tx.hash} chainId={tx.chainId} />
        </div>
      )}
    </div>
  );
}

export function TxMonitorPanel() {
  const { txs, clearTxs } = useTxMonitor();

  if (txs.length === 0) return null;

  return (
    <div className="mt-8 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <div>
          <h2 className="text-sm font-semibold text-gray-200">Session Transactions</h2>
          <p className="text-xs text-gray-500">Click a confirmed row to inspect events & logs</p>
        </div>
        <button onClick={clearTxs} className="text-xs text-gray-500 hover:text-gray-300 transition">
          Clear
        </button>
      </div>
      <div>
        {txs.map(tx => (
          <TxRow key={tx.hash} tx={tx} />
        ))}
      </div>
    </div>
  );
}
