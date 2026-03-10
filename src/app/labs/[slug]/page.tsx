import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLabBySlug } from '@/lib/practice-labs';
import { Erc20ApproveLab } from '@/components/labs/erc20-approve-lab';
import { Erc20Inspector } from '@/components/labs/erc20-inspector';
import { HardhatCounterLab } from '@/components/labs/hardhat-counter-lab';
import { TxLifecycleLab } from '@/components/labs/tx-lifecycle';
import { TxMonitorPanel } from '@/components/tx-monitor-panel';

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lab = getLabBySlug(slug);

  if (!lab) notFound();

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
          <Link href="/labs" className="hover:text-white transition">
            Labs
          </Link>
          <span>/</span>
          <span className="text-white">{lab.title}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-2">{lab.title}</h1>
        <p className="text-gray-400 mb-6">{lab.description}</p>

        {/* Meta chips */}
        <div className="flex gap-2 mb-8">
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              lab.level === 'beginner'
                ? 'bg-green-700 text-green-100'
                : 'bg-yellow-700 text-yellow-100'
            }`}
          >
            {lab.level}
          </span>
          <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
            {lab.networkName}
          </span>
        </div>

        {/* Objectives */}
        <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 mb-8">
          <h2 className="text-sm font-semibold text-gray-300 mb-2">Learning Objectives</h2>
          <ul className="space-y-1.5">
            {lab.objectives.map((obj, i) => (
              <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                <span className="text-blue-400 shrink-0 mt-0.5">→</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>

        {/* Lab component */}
        {slug === 'erc20-approve' && <Erc20ApproveLab />}
        {slug === 'erc20-inspector' && <Erc20Inspector />}
        {slug === 'hardhat-counter' && <HardhatCounterLab />}
        {slug === 'tx-lifecycle' && <TxLifecycleLab />}

        {/* Session transaction monitor (W3QA-25, W3QA-26, W3QA-27, W3QA-28) */}
        <TxMonitorPanel />
      </div>
    </main>
  );
}
