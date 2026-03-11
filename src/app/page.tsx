import Link from 'next/link';

/* ── Curriculum data ────────────────────────────────────────────── */

const TRACKS = [
  {
    level: 'Beginner',
    color: 'green',
    badge: 'bg-green-700 text-green-100',
    border: 'border-green-800/60',
    glow: 'from-green-900/30',
    modules: [
      {
        title: 'Wallet Onboarding',
        lessons: ['Connect & Disconnect Wallet', 'Network Mismatch & Switching'],
      },
      {
        title: 'Web3 QA Fundamentals',
        lessons: ['What Is a Transaction for QA', 'RPC Basics & Flakiness', 'Gas Mechanics for QA'],
      },
      {
        title: 'Local Blockchain',
        lessons: ['Local Blockchain Setup (Hardhat)', 'Mainnet Forking'],
      },
    ],
  },
  {
    level: 'Intermediate',
    color: 'yellow',
    badge: 'bg-yellow-700 text-yellow-100',
    border: 'border-yellow-800/60',
    glow: 'from-yellow-900/30',
    modules: [
      {
        title: 'Tx Lifecycle & Reverts',
        lessons: [
          'User Reject vs On-chain Revert',
          'QA Checklists for dApps',
          'Edge Cases & Error Paths',
        ],
      },
      {
        title: 'Events & Observability',
        lessons: ['Events & Logs 101'],
      },
    ],
  },
  {
    level: 'Expert',
    color: 'red',
    badge: 'bg-red-800 text-red-100',
    border: 'border-red-900/60',
    glow: 'from-red-900/30',
    modules: [
      {
        title: 'QA Lead Track',
        lessons: [
          'QA Strategy for Web3',
          'Release Readiness Framework',
          'Quality Metrics & KPIs',
          'Testable Acceptance Criteria',
          'Bug Triage & RCA',
          'Test Management Workflow',
          'Mentoring Playbook',
          'Hardhat & Foundry Testing Primer',
        ],
      },
      {
        title: 'Expert Automation Labs',
        lessons: [
          'Playwright Framework Starter',
          'MetaMask E2E with Synpress',
          'Wallet Matrix Harness',
          'Cross-Browser & Responsive CI',
          'GitHub Actions + Reports',
          'Flaky Test Management',
          'API Smoke Suite',
        ],
      },
      {
        title: 'Security & Performance',
        lessons: ['Threat Modeling for dApps', 'Testing RPC Failure Modes', 'Performance Budgets'],
      },
      {
        title: 'Cross-Device & Mobile',
        lessons: ['WalletConnect on Real Devices', 'Hardware Wallet Checklist'],
      },
    ],
  },
];

const LABS = [
  {
    slug: 'erc20-inspector',
    title: 'ERC-20 Token Inspector',
    description: 'Call view functions on a live Sepolia contract. No wallet needed.',
    level: 'Beginner',
    badge: 'bg-green-700 text-green-100',
    network: 'Sepolia',
  },
  {
    slug: 'erc20-approve',
    title: 'ERC-20 Approve Lab',
    description: 'Sign an approve() call, estimate gas first, verify the Approval event.',
    level: 'Intermediate',
    badge: 'bg-yellow-700 text-yellow-100',
    network: 'Sepolia',
  },
  {
    slug: 'hardhat-counter',
    title: 'Hardhat Counter Lab',
    description: 'Deploy locally, call increment/decrement/reset. Instant confirmations.',
    level: 'Intermediate',
    badge: 'bg-yellow-700 text-yellow-100',
    network: 'Local',
  },
  {
    slug: 'tx-lifecycle',
    title: 'Transaction Lifecycle Lab',
    description: 'Send a 0 ETH self-tx and watch every phase: pending → confirming → confirmed.',
    level: 'Beginner',
    badge: 'bg-green-700 text-green-100',
    network: 'Sepolia',
  },
];

const STATS = [
  { value: '9', label: 'Modules' },
  { value: '31', label: 'Lessons' },
  { value: '4', label: 'Interactive Labs' },
  { value: '3', label: 'Skill Levels' },
];

/* ── Page ───────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-800">
        {/* subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-gray-900" />

        <div className="relative container mx-auto px-4 py-24 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700/50 text-blue-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Web3 QA Learning Hub — Free & Open
          </span>
          <h1 className="text-5xl font-bold leading-tight mb-5">
            Learn to test{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Web3 applications
            </span>
            <br />
            like a pro
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Hands-on lessons, interactive smart-contract labs, and a full QA Lead track — from
            connecting a wallet to writing Playwright E2E suites with MetaMask.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/lessons/connect-disconnect-wallet"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
            >
              Start Learning
            </Link>
            <Link
              href="/labs"
              className="px-6 py-3 border border-gray-600 hover:bg-gray-800 rounded-lg font-semibold transition"
            >
              Explore Labs
            </Link>
          </div>

          {/* stats bar */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-700/50 rounded-2xl overflow-hidden border border-gray-700/50">
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-gray-900 px-6 py-5">
                <p className="text-3xl font-bold text-white">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum ───────────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Full Curriculum</h2>
          <p className="text-gray-400">
            Three tracks — pick up wherever your current skill level is.
          </p>
        </div>

        <div className="space-y-6">
          {TRACKS.map(track => (
            <div
              key={track.level}
              className={`rounded-2xl border ${track.border} bg-gradient-to-b ${track.glow} to-gray-900/50 overflow-hidden`}
            >
              {/* track header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-800/60">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${track.badge}`}>
                  {track.level}
                </span>
                <span className="text-sm text-gray-500">
                  {track.modules.reduce((n, m) => n + m.lessons.length, 0)} lessons across{' '}
                  {track.modules.length} module{track.modules.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* modules grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800/30">
                {track.modules.map(mod => (
                  <div key={mod.title} className="bg-gray-900/60 px-5 py-4">
                    <p className="text-sm font-semibold text-white mb-2">{mod.title}</p>
                    <ul className="space-y-1">
                      {mod.lessons.map(lesson => (
                        <li key={lesson} className="flex items-start gap-1.5 text-xs text-gray-500">
                          <span className="text-gray-700 mt-0.5 shrink-0">→</span>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/lessons/connect-disconnect-wallet"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
          >
            Browse all lessons in the docs →
          </Link>
        </div>
      </section>

      {/* ── Free account perks ───────────────────────────────────── */}
      <section className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="rounded-2xl border border-blue-800/40 bg-gradient-to-b from-blue-900/20 to-gray-900/50 p-8 sm:p-10">
            <div className="sm:flex sm:items-start sm:gap-10">
              <div className="mb-6 sm:mb-0 sm:flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
                  Free account
                </p>
                <h2 className="text-2xl font-bold mb-3">Why create an account?</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  All lessons and labs are{' '}
                  <span className="text-white font-medium">100 % free</span> — no paywall, no credit
                  card. An account just lets you track your progress so you can pick up exactly
                  where you left off.
                </p>
              </div>
              <ul className="sm:w-64 space-y-3">
                {[
                  ['✓', 'Mark lessons as complete'],
                  ['✓', 'Personal progress dashboard'],
                  ['✓', 'Works across devices'],
                  ['✓', 'No spam, ever'],
                ].map(([icon, text]) => (
                  <li key={text} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-blue-900/60 border border-blue-700/60 flex items-center justify-center text-blue-400 text-xs font-bold shrink-0">
                      {icon}
                    </span>
                    <span className="text-gray-300">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition"
              >
                Create free account
              </Link>
              <Link
                href="/login"
                className="px-5 py-2.5 border border-gray-600 hover:bg-gray-800 rounded-lg text-sm font-semibold transition"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Labs ─────────────────────────────────────────────────── */}
      <section className="border-t border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Interactive Labs</h2>
            <p className="text-gray-400">
              Connect your wallet and interact with real contracts — no setup required for read-only
              labs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {LABS.map(lab => (
              <Link
                key={lab.slug}
                href={`/labs/${lab.slug}`}
                className="group bg-gray-800 border border-gray-700 hover:border-gray-500 rounded-xl p-5 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${lab.badge}`}>
                      {lab.level}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-400">
                      {lab.network}
                    </span>
                  </div>
                  <span className="text-gray-600 group-hover:text-gray-400 transition text-lg leading-none">
                    →
                  </span>
                </div>
                <p className="font-semibold text-white mb-1">{lab.title}</p>
                <p className="text-sm text-gray-400">{lab.description}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/labs"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
            >
              See all labs →
            </Link>
          </div>
        </div>
      </section>

      {/* ── About the author ─────────────────────────────────────── */}
      <section className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold shrink-0">
              GQ
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Built by</p>
              <p className="text-lg font-bold mb-1">GaslessQA</p>
              <p className="text-sm text-gray-400 mb-4">
                Web3 QA Engineer. I built this platform to share practical knowledge about testing
                decentralised applications — the kind of content I wish existed when I started.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://www.linkedin.com/in/gaslessqa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-700/30 border border-blue-700/50 rounded-lg text-xs text-blue-300 hover:bg-blue-700/50 transition"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a
                  href="mailto:gaslessqa@gmail.com"
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 border border-gray-600 rounded-lg text-xs text-gray-300 hover:bg-gray-700 transition"
                >
                  gaslessqa@gmail.com
                </a>
                <Link
                  href="/about"
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 border border-gray-600 rounded-lg text-xs text-gray-300 hover:bg-gray-700 transition"
                >
                  About me →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Web3 QA Learning Hub — GaslessQA</p>
          <div className="flex gap-6">
            <Link
              href="/lessons/connect-disconnect-wallet"
              className="hover:text-gray-400 transition"
            >
              Docs
            </Link>
            <Link href="/labs" className="hover:text-gray-400 transition">
              Labs
            </Link>
            <Link href="/about" className="hover:text-gray-400 transition">
              About
            </Link>
            <a
              href="https://www.linkedin.com/in/gaslessqa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
