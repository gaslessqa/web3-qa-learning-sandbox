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
import { formatUnits, parseUnits } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ERC20_ABI } from '@/lib/practice-labs';
import { useTxMonitor } from '@/contexts/tx-monitor-context';

const LINK_SEPOLIA = '0x779877A7B0D9E8603169DdbD7836e478b4624789' as const;
// Simulated router — no real DEX needed for the QA learning exercise
const MOCK_ROUTER = '0xD3664B5e72B46eaba722aB6f43c22dBF40181954' as const;
const SEPOLIA_CHAIN_ID = 11155111;

type Tab = 'swap' | 'staking';

/* ── helpers ─────────────────────────────────────────────────── */

function StepBadge({ n }: { n: number }) {
  return (
    <span className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
      {n}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-900 rounded-lg p-3">
      <span className="text-xs text-gray-500 block mb-1">{label}</span>
      <span className="font-mono text-sm text-green-400">{value}</span>
    </div>
  );
}

function QaNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 flex gap-2 bg-yellow-900/20 border border-yellow-700/40 rounded-lg p-3">
      <span className="text-yellow-500 text-xs font-bold shrink-0 mt-0.5">QA</span>
      <p className="text-xs text-yellow-200/80 leading-relaxed">{children}</p>
    </div>
  );
}

/* ── Swap tab ─────────────────────────────────────────────────── */

function SwapTab() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isOnSepolia = chainId === SEPOLIA_CHAIN_ID;
  const { trackTx } = useTxMonitor();

  const [amountIn, setAmountIn] = useState('0.5');
  const [slippage, setSlippage] = useState('0.5');
  const [swapPhase, setSwapPhase] = useState<'idle' | 'pending' | 'success'>('idle');

  // Read LINK balance
  const { data: balance, isLoading: balLoading } = useReadContract({
    address: LINK_SEPOLIA,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: SEPOLIA_CHAIN_ID,
    query: { enabled: !!address },
  });

  const { data: decimals } = useReadContract({
    address: LINK_SEPOLIA,
    abi: ERC20_ABI,
    functionName: 'decimals',
    chainId: SEPOLIA_CHAIN_ID,
  });

  const { data: symbol } = useReadContract({
    address: LINK_SEPOLIA,
    abi: ERC20_ABI,
    functionName: 'symbol',
    chainId: SEPOLIA_CHAIN_ID,
  });

  const formattedBalance =
    balance !== undefined && decimals !== undefined ? formatUnits(balance, decimals) : undefined;

  const parsedAmount = (() => {
    try {
      return decimals !== undefined ? parseUnits(amountIn || '0', decimals) : undefined;
    } catch {
      return undefined;
    }
  })();

  const canSimulate = !!address && !!parsedAmount && parsedAmount > 0n && isOnSepolia;

  // Simulate approve(MOCK_ROUTER, amount) — real on-chain simulation
  const {
    data: simulation,
    isLoading: simLoading,
    error: simError,
  } = useSimulateContract({
    address: LINK_SEPOLIA,
    abi: ERC20_ABI,
    functionName: 'approve',
    args: parsedAmount !== undefined ? [MOCK_ROUTER, parsedAmount] : undefined,
    account: address,
    chainId: SEPOLIA_CHAIN_ID,
    query: { enabled: canSimulate },
  });

  const {
    writeContract,
    data: approveTxHash,
    isPending,
    error: writeError,
    reset,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: approveConfirmed } = useWaitForTransactionReceipt({
    hash: approveTxHash,
  });

  useEffect(() => {
    if (approveTxHash) {
      trackTx(
        approveTxHash,
        `Approve ${amountIn} ${symbol ?? 'LINK'} → swap router`,
        SEPOLIA_CHAIN_ID
      );
    }
  }, [approveTxHash]);

  // Derived mock swap values
  const mockPriceImpact = '0.12';
  const mockMinReceived = amountIn
    ? (Number(amountIn) * 2.84 * (1 - Number(slippage) / 100)).toFixed(4)
    : '—';
  const mockAmountOut = amountIn ? (Number(amountIn) * 2.84).toFixed(4) : '—';

  function handleApprove() {
    if (!simulation?.request) return;
    reset();
    writeContract(simulation.request);
  }

  function handleSimulateSwap() {
    setSwapPhase('pending');
    setTimeout(() => setSwapPhase('success'), 2500);
  }

  return (
    <div className="space-y-5">
      {/* Step 1 */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <StepBadge n={1} />
          <h2 className="text-lg font-semibold">Connect & Switch to Sepolia</h2>
        </div>
        <ConnectButton />
        {isConnected && !isOnSepolia && (
          <p className="text-yellow-400 text-sm mt-3">Switch to Sepolia to continue.</p>
        )}
        {isConnected && isOnSepolia && (
          <p className="text-green-400 text-sm mt-3">Connected on Sepolia.</p>
        )}
      </section>

      {/* Step 2 — balance + config */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <StepBadge n={2} />
          <h2 className="text-lg font-semibold">Configure Swap</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InfoRow
            label={`Your ${symbol ?? 'LINK'} balance`}
            value={
              !isConnected
                ? 'Connect wallet'
                : balLoading
                  ? 'Loading...'
                  : formattedBalance !== undefined
                    ? `${Number(formattedBalance).toLocaleString()} ${symbol ?? ''}`
                    : '—'
            }
          />
          <InfoRow label="Simulated rate" value={`1 ${symbol ?? 'LINK'} ≈ 2.84 MockUSD`} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Amount to swap ({symbol ?? 'LINK'})
            </label>
            <input
              value={amountIn}
              onChange={e => setAmountIn(e.target.value)}
              type="number"
              min="0"
              step="any"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Slippage tolerance (%)</label>
            <div className="flex gap-1">
              {['0.1', '0.5', '1.0'].map(v => (
                <button
                  key={v}
                  onClick={() => setSlippage(v)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition ${
                    slippage === v
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-900 border border-gray-600 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {v}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quote summary */}
        <div className="bg-gray-900 rounded-lg p-4 space-y-2 border border-gray-700/50">
          <p className="text-xs text-gray-500 font-medium mb-2">Swap quote (simulated)</p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">You pay</span>
            <span className="text-white font-mono">
              {amountIn || '0'} {symbol ?? 'LINK'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">You receive ~</span>
            <span className="text-green-400 font-mono">{mockAmountOut} MockUSD</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Min. received</span>
            <span className="text-yellow-400 font-mono">{mockMinReceived} MockUSD</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price impact</span>
            <span
              className={`font-mono ${Number(mockPriceImpact) > 1 ? 'text-red-400' : 'text-green-400'}`}
            >
              {mockPriceImpact}%
            </span>
          </div>
        </div>

        <QaNote>
          Verify: balance ≥ swap amount, slippage is within acceptable range (&lt;1% for most
          cases), price impact is not unusually high. A real DEX quote can change between blocks —
          QA should test stale-quote and frontrun scenarios.
        </QaNote>
      </section>

      {/* Step 3 — approve */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <StepBadge n={3} />
          <h2 className="text-lg font-semibold">Approve Router</h2>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          Before swapping, the DEX router must be approved to spend your tokens. This triggers a
          real{' '}
          <code className="text-gray-300 bg-gray-700 px-1 py-0.5 rounded text-xs">approve()</code>{' '}
          call on Sepolia.
        </p>

        <div className="bg-gray-900 rounded-lg p-3 mb-4">
          <span className="text-xs text-gray-500 block mb-1">Estimated gas (approve)</span>
          {!canSimulate ? (
            <span className="text-gray-600 text-sm">Connect wallet + fill amount</span>
          ) : simLoading ? (
            <span className="text-gray-500 text-sm animate-pulse">Simulating...</span>
          ) : simError ? (
            <span className="text-red-400 text-sm">Simulation failed: {simError.message}</span>
          ) : simulation?.request?.gas !== undefined ? (
            <span className="text-green-400 font-mono text-sm">
              {simulation.request.gas.toString()} gas
            </span>
          ) : (
            <span className="text-gray-600 text-sm">—</span>
          )}
        </div>

        <button
          onClick={handleApprove}
          disabled={
            !simulation?.request || isPending || isConfirming || !isConnected || !isOnSepolia
          }
          className="px-5 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {isPending ? 'Waiting for wallet...' : isConfirming ? 'Confirming...' : 'Approve Router'}
        </button>

        {writeError && (
          <div className="mt-3 bg-red-900/30 border border-red-700 rounded-lg p-3">
            <p className="text-red-300 text-sm">{writeError.message}</p>
          </div>
        )}

        {approveConfirmed && (
          <p className="text-green-400 text-sm mt-3">
            Approval confirmed — router can now pull your tokens.
          </p>
        )}

        <QaNote>
          QA check: verify the Approval event was emitted with the correct spender and amount. Try
          approving 0 first (reset allowance), then the target amount — some tokens reject non-zero
          → non-zero approvals.
        </QaNote>
      </section>

      {/* Step 4 — execute swap (simulated) */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <StepBadge n={4} />
          <h2 className="text-lg font-semibold">Execute Swap</h2>
          <span className="text-xs bg-purple-900/60 border border-purple-700/50 text-purple-300 px-2 py-0.5 rounded-full">
            Simulated
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          No real DEX contract is deployed on this testnet. The button below simulates the swap
          state machine so you can observe the full QA flow: pending → confirming → success.
        </p>

        <button
          onClick={handleSimulateSwap}
          disabled={swapPhase === 'pending' || !isConnected}
          className="px-5 py-2 bg-purple-600 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {swapPhase === 'pending'
            ? 'Simulating...'
            : swapPhase === 'success'
              ? 'Swap Again'
              : 'Simulate Swap'}
        </button>

        {swapPhase === 'pending' && (
          <div className="mt-4 flex items-center gap-2 text-yellow-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shrink-0" />
            Transaction pending...
          </div>
        )}

        {swapPhase === 'success' && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
              Swap confirmed (simulated)
            </div>
            <div className="bg-gray-900 rounded-lg p-4 space-y-2 text-sm border border-gray-700/50">
              <div className="flex justify-between">
                <span className="text-gray-400">Sent</span>
                <span className="text-white font-mono">
                  {amountIn} {symbol ?? 'LINK'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Received</span>
                <span className="text-green-400 font-mono">{mockAmountOut} MockUSD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Slippage applied</span>
                <span className="text-yellow-400 font-mono">{slippage}%</span>
              </div>
            </div>
          </div>
        )}

        <QaNote>
          Real swap QA checklist: (1) token balance decreased by exact swap amount, (2) output token
          balance increased by ≥ minReceived, (3) Swap event emitted with correct amounts, (4)
          deadline not exceeded, (5) slippage-exceeded path returns tokens and emits no Swap event.
        </QaNote>
      </section>
    </div>
  );
}

/* ── Staking tab ──────────────────────────────────────────────── */

const APY_BY_DURATION: Record<string, number> = { '7': 4.2, '14': 6.8, '30': 12.5 };

type StakePhase = 'idle' | 'approving' | 'staking' | 'staked' | 'unstaking' | 'unstaked';

function StakingTab() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isOnSepolia = chainId === SEPOLIA_CHAIN_ID;

  const [stakeAmount, setStakeAmount] = useState('10');
  const [duration, setDuration] = useState('14');
  const [phase, setPhase] = useState<StakePhase>('idle');
  const [stakedAt, setStakedAt] = useState<number | null>(null);

  const { data: balance } = useReadContract({
    address: LINK_SEPOLIA,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: SEPOLIA_CHAIN_ID,
    query: { enabled: !!address },
  });

  const { data: decimals } = useReadContract({
    address: LINK_SEPOLIA,
    abi: ERC20_ABI,
    functionName: 'decimals',
    chainId: SEPOLIA_CHAIN_ID,
  });

  const { data: symbol } = useReadContract({
    address: LINK_SEPOLIA,
    abi: ERC20_ABI,
    functionName: 'symbol',
    chainId: SEPOLIA_CHAIN_ID,
  });

  const formattedBalance =
    balance !== undefined && decimals !== undefined ? formatUnits(balance, decimals) : undefined;

  const apy = APY_BY_DURATION[duration] ?? 6.8;
  const estimatedReward = stakeAmount
    ? ((Number(stakeAmount) * apy * Number(duration)) / 365 / 100).toFixed(4)
    : '0';

  function advance() {
    if (phase === 'idle') {
      setPhase('approving');
      setTimeout(() => {
        setPhase('staking');
        setTimeout(() => {
          setPhase('staked');
          setStakedAt(Date.now());
        }, 1500);
      }, 1500);
    }
    if (phase === 'staked') {
      setPhase('unstaking');
      setTimeout(() => setPhase('unstaked'), 2000);
    }
    if (phase === 'unstaked') {
      setPhase('idle');
      setStakedAt(null);
    }
  }

  const btnLabel = {
    idle: 'Stake tokens',
    approving: 'Approving staking contract...',
    staking: 'Staking...',
    staked: 'Unstake',
    unstaking: 'Unstaking...',
    unstaked: 'Reset',
  }[phase];

  const btnDisabled =
    phase === 'approving' || phase === 'staking' || phase === 'unstaking' || !isConnected;

  const unlockDate = stakedAt
    ? new Date(stakedAt + Number(duration) * 24 * 60 * 60 * 1000).toLocaleDateString()
    : '—';

  return (
    <div className="space-y-5">
      {/* Step 1 — connect */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <StepBadge n={1} />
          <h2 className="text-lg font-semibold">Connect Wallet</h2>
        </div>
        <ConnectButton />
        {isConnected && !isOnSepolia && (
          <p className="text-yellow-400 text-sm mt-3">Switch to Sepolia to continue.</p>
        )}
        {isConnected && isOnSepolia && (
          <p className="text-green-400 text-sm mt-3">Connected on Sepolia.</p>
        )}
      </section>

      {/* Step 2 — configure */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <StepBadge n={2} />
          <h2 className="text-lg font-semibold">Configure Position</h2>
        </div>

        <InfoRow
          label={`Your ${symbol ?? 'LINK'} balance`}
          value={
            !isConnected
              ? 'Connect wallet'
              : formattedBalance !== undefined
                ? `${Number(formattedBalance).toLocaleString()} ${symbol ?? ''}`
                : '—'
          }
        />

        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Amount to stake ({symbol ?? 'LINK'})
          </label>
          <input
            value={stakeAmount}
            onChange={e => setStakeAmount(e.target.value)}
            type="number"
            min="0"
            step="any"
            disabled={phase !== 'idle'}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 block mb-2">Lock duration</label>
          <div className="flex gap-2">
            {Object.entries(APY_BY_DURATION).map(([d, rate]) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                disabled={phase !== 'idle'}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition ${
                  duration === d
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-900 border border-gray-600 text-gray-400 hover:bg-gray-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="block">{d} days</span>
                <span
                  className={`text-xs font-bold ${duration === d ? 'text-blue-200' : 'text-green-400'}`}
                >
                  {rate}% APY
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projected earnings */}
        <div className="bg-gray-900 rounded-lg p-4 space-y-2 border border-gray-700/50">
          <p className="text-xs text-gray-500 font-medium mb-2">Projected position</p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Staked</span>
            <span className="text-white font-mono">
              {stakeAmount || '0'} {symbol ?? 'LINK'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">APY</span>
            <span className="text-green-400 font-mono">{apy}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Estimated reward</span>
            <span className="text-green-400 font-mono">
              +{estimatedReward} {symbol ?? 'LINK'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Unlock date</span>
            <span className="text-yellow-400 font-mono">{phase !== 'idle' ? unlockDate : '—'}</span>
          </div>
        </div>

        <QaNote>
          QA checks before staking: confirm amount ≤ balance, lock duration is clearly displayed,
          APY is accurate and matches contract state, early-withdrawal penalty (if any) is
          disclosed.
        </QaNote>
      </section>

      {/* Step 3 — stake / unstake lifecycle */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <StepBadge n={3} />
          <h2 className="text-lg font-semibold">Stake / Unstake Lifecycle</h2>
          <span className="text-xs bg-purple-900/60 border border-purple-700/50 text-purple-300 px-2 py-0.5 rounded-full">
            Simulated
          </span>
        </div>

        {/* Phase timeline */}
        <div className="flex items-center gap-1 mb-5 text-xs">
          {(
            ['idle', 'approving', 'staking', 'staked', 'unstaking', 'unstaked'] as StakePhase[]
          ).map((p, i) => {
            const phases: StakePhase[] = [
              'idle',
              'approving',
              'staking',
              'staked',
              'unstaking',
              'unstaked',
            ];
            const currentIdx = phases.indexOf(phase);
            const thisIdx = phases.indexOf(p);
            const isActive = p === phase;
            const isPast = thisIdx < currentIdx;
            return (
              <span key={p} className="flex items-center gap-1">
                {i > 0 && <span className="text-gray-700">—</span>}
                <span
                  className={`px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-blue-600 text-white font-medium'
                      : isPast
                        ? 'bg-gray-700 text-gray-400'
                        : 'text-gray-600'
                  }`}
                >
                  {p}
                </span>
              </span>
            );
          })}
        </div>

        <button
          onClick={advance}
          disabled={btnDisabled}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed ${
            phase === 'staked' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {btnLabel}
        </button>

        {(phase === 'approving' || phase === 'staking' || phase === 'unstaking') && (
          <div className="mt-4 flex items-center gap-2 text-yellow-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shrink-0" />
            {phase === 'approving' && 'Approving staking contract to pull tokens...'}
            {phase === 'staking' && 'Sending stake transaction...'}
            {phase === 'unstaking' && 'Initiating withdrawal...'}
          </div>
        )}

        {phase === 'staked' && (
          <div className="mt-4 bg-gray-900 rounded-lg p-4 space-y-2 border border-green-800/40">
            <p className="text-xs text-green-400 font-semibold mb-2">Position active</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Staked amount</span>
              <span className="text-white font-mono">
                {stakeAmount} {symbol ?? 'LINK'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Estimated reward</span>
              <span className="text-green-400 font-mono">
                +{estimatedReward} {symbol ?? 'LINK'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Unlocks on</span>
              <span className="text-yellow-400 font-mono">{unlockDate}</span>
            </div>
          </div>
        )}

        {phase === 'unstaked' && (
          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
            Unstake complete — tokens + rewards returned (simulated).
          </div>
        )}

        <QaNote>
          Staking QA checklist: (1) staked balance locked — verify transfer fails during lock
          period, (2) rewards accrue at correct rate, (3) early-unstake triggers penalty or revert,
          (4) unstake after lock returns principal + rewards, (5) Staked / Withdrawn events emitted
          with correct amounts and recipient.
        </QaNote>
      </section>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────── */

export function SwapStakingLab() {
  const [tab, setTab] = useState<Tab>('swap');

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-gray-800 border border-gray-700 rounded-xl mb-6 w-fit">
        {(['swap', 'staking'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition capitalize ${
              tab === t ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t === 'swap' ? 'Token Swap' : 'Staking'}
          </button>
        ))}
      </div>

      {tab === 'swap' ? <SwapTab /> : <StakingTab />}
    </div>
  );
}
