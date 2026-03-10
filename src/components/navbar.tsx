'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from '@/contexts/auth-context';
import { DocsSearch } from '@/components/docs-search';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          Web3 QA Hub
        </Link>
        <span className="hidden md:block text-xs text-gray-500">by GaslessQA</span>

        <div className="flex items-center gap-4">
          {/* Global search trigger — opens the same DocsSearch overlay */}
          <div className="hidden md:block">
            <DocsSearch navbarMode />
          </div>
          <Link
            href="/labs"
            className="text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Labs
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            About
          </Link>
          <a
            href="https://www.linkedin.com/in/gaslessqa/"
            target="_blank"
            rel="noopener noreferrer"
            title="GaslessQA on LinkedIn"
            className="text-gray-400 hover:text-blue-400 transition p-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          {user ? (
            <Link
              href="/dashboard"
              className="text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          <ConnectButton />

          {user && (
            <button
              onClick={handleSignOut}
              className="text-sm px-3 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
