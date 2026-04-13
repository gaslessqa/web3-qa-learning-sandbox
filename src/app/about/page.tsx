import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About the Author — Web3 QA Hub',
  description:
    'GaslessQA — Web3 QA Engineer specialising in smart contract testing, dApp automation, and blockchain quality assurance.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        {/* Avatar / header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-24 h-24 rounded-full mb-5 ring-4 ring-gray-700 overflow-hidden relative">
            <Image src="/avatar.png" alt="GaslessQA" fill className="object-cover" priority />
          </div>
          <h1 className="text-3xl font-bold mb-1">GaslessQA</h1>
          <p className="text-blue-400 text-sm font-medium tracking-wide uppercase mb-4">
            Web3 QA Engineer
          </p>

          {/* Contact chips */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/gaslessqa/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-700/30 border border-blue-600/50 rounded-full text-sm text-blue-300 hover:bg-blue-700/50 hover:text-white transition"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href="mailto:gaslessqa@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-full text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition"
            >
              <MailIcon />
              gaslessqa@gmail.com
            </a>
          </div>
        </div>

        {/* About section */}
        <section className="bg-gray-800/60 border border-gray-700 rounded-2xl p-8 mb-8 space-y-4 text-gray-300 leading-relaxed">
          <h2 className="text-lg font-semibold text-white mb-4">About me</h2>
          <p>
            I&apos;m a QA engineer with over 15 years of experience in manual and automated
            testing, now specialising in Web3 and blockchain quality assurance. I built this
            platform to share practical, hands-on knowledge about testing decentralised
            applications — the kind of content I wish existed when I started.
          </p>
          <p>
            My background includes large-scale production systems — most notably{' '}
            <strong className="text-white">Ayoba</strong>, a messaging and content platform with
            millions of active users. That experience shaped how I think about reliability,
            scalability, and test coverage at scale.
          </p>
          <p>
            Moving into Web3 meant learning an entirely new failure surface: wallets, gas,
            reverts, on-chain state, cross-chain behaviour. This hub is my attempt to map that
            territory — from beginner wallet testing to smart contract QA, threat modelling, and
            automation frameworks tailored to dApps.
          </p>
          <p>
            If you want to talk Web3 QA, collaborate on tooling, or have questions about anything
            here — feel free to reach out.
          </p>
        </section>

        {/* What I work with */}
        <section className="bg-gray-800/60 border border-gray-700 rounded-2xl p-8 mb-8">
          <h2 className="text-lg font-semibold text-white mb-5">What I work with</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              'WebdriverIO / Appium / Selenium',
              'Playwright + Synpress',
              'Node.js · Jest · Cucumber',
              'Smart Contract QA (EVM)',
              'Truffle / Ganache / Hardhat',
              'Tenderly · Etherscan · Viewblock',
              'Ethereum · Avalanche · Base · Arbitrum',
              'RPC · Events · On-chain Verification',
              'API & Security Testing',
              'CI/CD Pipelines',
            ].map(skill => (
              <div key={skill} className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Open to work */}
        <section className="bg-blue-900/20 border border-blue-700/40 rounded-2xl p-8 text-center">
          <h2 className="text-lg font-semibold text-white mb-2">Open to opportunities</h2>
          <p className="text-gray-400 text-sm mb-5">
            Looking for Web3 QA roles where there&apos;s real depth to the problem — smart
            contracts, cross-chain, security, or automation at scale. Let&apos;s talk.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a
              href="https://www.linkedin.com/in/gaslessqa/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
            >
              Connect on LinkedIn
            </a>
            <a
              href="mailto:gaslessqa@gmail.com"
              className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition"
            >
              Send an email
            </a>
          </div>
        </section>

        {/* Back to learning */}
        <div className="text-center mt-10">
          <Link
            href="/lessons/connect-disconnect-wallet"
            className="text-sm text-gray-500 hover:text-gray-300 transition"
          >
            ← Back to the learning hub
          </Link>
        </div>
      </div>
    </main>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75"
      />
    </svg>
  );
}
