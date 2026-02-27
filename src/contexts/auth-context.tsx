// src/contexts/auth-context.tsx
'use client';

import { getClient } from '@/lib/supabase/client';
import type { Database } from '@/types/supabase';
import type { AuthError, User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];

type AuthResult = { error: AuthError | null };

type AuthContextValue = {
  user: User | null;
  profile: ProfileRow | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, options?: { display_name?: string }) => Promise<AuthResult>;
  signInWithOAuth: (provider: 'google' | 'github') => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function isAbortError(err: unknown) {
  const e = err as { name?: string; message?: string };
  return e?.name === 'AbortError' || e?.message?.includes('signal is aborted');
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Prevent double initialization in React Strict Mode (dev)
  const didInitRef = useRef(false);

  useEffect(() => {
    // In dev Strict Mode, effects can run twice. Guard to run only once.
    if (didInitRef.current) return;
    didInitRef.current = true;

    let cancelled = false;
    const supabase = getClient();

    async function loadProfile(userId: string) {
      // Profile is optional; don't block auth if it fails.
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();

      return data ?? null;
    }

    async function init() {
      try {
        // 1) Read current session
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        const sessionUser = data.session?.user ?? null;

        if (!cancelled) setUser(sessionUser);

        // 2) Fetch profile if logged in
        if (sessionUser) {
          const p = await loadProfile(sessionUser.id);
          if (!cancelled) setProfile(p);
        } else {
          if (!cancelled) setProfile(null);
        }
      } catch (e) {
        // AbortError is common in dev/HMR due to auth lock cancellation.
        // Ignore AbortError; log only unexpected errors.
        if (!cancelled && !isAbortError(e)) {
          console.error('Error initializing auth:', e);
        }

        if (!cancelled) {
          setUser(null);
          setProfile(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    init();

    // 3) Subscribe to auth changes
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);

      if (nextUser) {
        try {
          const p = await loadProfile(nextUser.id);
          setProfile(p);
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      isLoading,
      signIn: async (email, password) => {
        const supabase = getClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
      },
      signUp: async (email, password, options) => {
        const supabase = getClient();
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: options?.display_name },
          },
        });
        return { error };
      },
      signInWithOAuth: async (provider) => {
        const supabase = getClient();
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        return { error };
      },
      signOut: async () => {
        const supabase = getClient();
        await supabase.auth.signOut();
      },
    }),
    [user, profile, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
