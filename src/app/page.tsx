import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Web3 QA Hub</h1>
        <nav className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Master Web3 Quality Assurance
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Learn blockchain testing, smart contract auditing, and Web3 QA best
          practices through interactive lessons and hands-on exercises.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-4 bg-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Learning
          </Link>
          <Link
            href="#modules"
            className="px-8 py-4 border border-gray-500 rounded-lg text-lg font-semibold hover:bg-gray-700 transition"
          >
            View Modules
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">
          What You&apos;ll Learn
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="text-4xl mb-4">🔍</div>
            <h4 className="text-xl font-semibold mb-2">Smart Contract Testing</h4>
            <p className="text-gray-400">
              Learn to test Solidity contracts using frameworks like Foundry and
              Hardhat.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="text-4xl mb-4">🛡️</div>
            <h4 className="text-xl font-semibold mb-2">Security Auditing</h4>
            <p className="text-gray-400">
              Understand common vulnerabilities and how to identify them in
              blockchain applications.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-semibold mb-2">DApp Testing</h4>
            <p className="text-gray-400">
              Master end-to-end testing for decentralized applications and Web3
              interfaces.
            </p>
          </div>
        </div>
      </section>

      {/* Modules Preview */}
      <section id="modules" className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">
          Learning Modules
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-xl">
            <span className="text-sm bg-green-600 px-2 py-1 rounded">
              Beginner
            </span>
            <h4 className="text-xl font-semibold mt-4 mb-2">
              Web3 QA Fundamentals
            </h4>
            <p className="text-gray-300 text-sm">
              Introduction to blockchain testing concepts and tools.
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 p-6 rounded-xl">
            <span className="text-sm bg-yellow-600 px-2 py-1 rounded">
              Intermediate
            </span>
            <h4 className="text-xl font-semibold mt-4 mb-2">
              Smart Contract Testing
            </h4>
            <p className="text-gray-300 text-sm">
              Deep dive into contract testing with Foundry and Hardhat.
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-900 to-red-800 p-6 rounded-xl">
            <span className="text-sm bg-red-600 px-2 py-1 rounded">Expert</span>
            <h4 className="text-xl font-semibold mt-4 mb-2">
              Security & Auditing
            </h4>
            <p className="text-gray-300 text-sm">
              Advanced security testing and audit methodologies.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-500 border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} Web3 QA Learning Hub. All rights reserved.</p>
      </footer>
    </main>
  );
}
