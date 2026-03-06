'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { user, profile, signOut } = useAuth();
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

        <div className="flex items-center gap-4">
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
