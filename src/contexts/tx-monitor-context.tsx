'use client';

import { createContext, useCallback, useContext, useState } from 'react';

export type TrackedTx = {
  hash: `0x${string}`;
  label: string;
  chainId: number;
  addedAt: number;
};

type TxMonitorContextType = {
  txs: TrackedTx[];
  trackTx: (hash: `0x${string}`, label: string, chainId: number) => void;
  clearTxs: () => void;
};

const TxMonitorContext = createContext<TxMonitorContextType | null>(null);

export function TxMonitorProvider({ children }: { children: React.ReactNode }) {
  const [txs, setTxs] = useState<TrackedTx[]>([]);

  const trackTx = useCallback((hash: `0x${string}`, label: string, chainId: number) => {
    setTxs(prev => [
      { hash, label, chainId, addedAt: Date.now() },
      ...prev.filter(t => t.hash !== hash),
    ]);
  }, []);

  const clearTxs = useCallback(() => setTxs([]), []);

  return (
    <TxMonitorContext.Provider value={{ txs, trackTx, clearTxs }}>
      {children}
    </TxMonitorContext.Provider>
  );
}

export function useTxMonitor() {
  const ctx = useContext(TxMonitorContext);
  if (!ctx) throw new Error('useTxMonitor must be used inside TxMonitorProvider');
  return ctx;
}
