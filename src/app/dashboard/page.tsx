"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { user, profile, isLoading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Web3 QA Hub
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">
              {profile?.display_name || user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400">0</div>
            <div className="text-gray-400 mt-1">Lessons Completed</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400">0</div>
            <div className="text-gray-400 mt-1">Achievements</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400">0%</div>
            <div className="text-gray-400 mt-1">Overall Progress</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400">Beginner</div>
            <div className="text-gray-400 mt-1">Current Level</div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400">
              You haven&apos;t started any lessons yet. Begin your Web3 QA journey
              below!
            </p>
          </div>
        </section>

        {/* Available Modules */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Available Modules</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 border border-green-700 rounded-xl p-6">
              <span className="text-sm bg-green-600 px-2 py-1 rounded">
                Beginner
              </span>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                Web3 QA Fundamentals
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Introduction to blockchain testing concepts and tools.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">0/3 lessons</span>
                <button className="px-4 py-2 bg-green-600 rounded-lg text-sm hover:bg-green-700 transition">
                  Start
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 border border-yellow-700 rounded-xl p-6 opacity-75">
              <span className="text-sm bg-yellow-600 px-2 py-1 rounded">
                Intermediate
              </span>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                Smart Contract Testing
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Deep dive into contract testing with Foundry and Hardhat.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Locked</span>
                <button
                  disabled
                  className="px-4 py-2 bg-gray-600 rounded-lg text-sm cursor-not-allowed"
                >
                  Complete Beginner
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 border border-red-700 rounded-xl p-6 opacity-75">
              <span className="text-sm bg-red-600 px-2 py-1 rounded">
                Expert
              </span>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                Security & Auditing
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Advanced security testing and audit methodologies.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Locked</span>
                <button
                  disabled
                  className="px-4 py-2 bg-gray-600 rounded-lg text-sm cursor-not-allowed"
                >
                  Complete Intermediate
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
