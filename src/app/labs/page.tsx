import Link from 'next/link';
import { PRACTICE_LABS } from '@/lib/practice-labs';

export default function LabsPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Smart Contract Labs</h1>
        <p className="text-gray-400 mb-8">
          Hands-on practice with real on-chain interactions on Sepolia testnet.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {PRACTICE_LABS.map(lab => (
            <div
              key={lab.slug}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-xs px-2 py-1 rounded capitalize ${
                    lab.level === 'beginner'
                      ? 'bg-green-700 text-green-100'
                      : 'bg-yellow-700 text-yellow-100'
                  }`}
                >
                  {lab.level}
                </span>
                <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                  {lab.networkName}
                </span>
              </div>

              <h2 className="text-xl font-semibold mb-2">{lab.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{lab.description}</p>

              <ul className="text-sm text-gray-300 space-y-1.5 mb-6 flex-1">
                {lab.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 shrink-0">→</span>
                    {obj}
                  </li>
                ))}
              </ul>

              <Link
                href={`/labs/${lab.slug}`}
                className="inline-block px-4 py-2 bg-blue-600 rounded-lg text-sm text-center hover:bg-blue-700 transition"
              >
                Open Lab
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
