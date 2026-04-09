// src/contexts/auth-context.tsx
'use client';

import { getClient } from '@/lib/supabase/client';
import type { Database } from '@/types/supabase';
import type { AuthError, User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

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

  useEffect(() => {
    const supabase = getClient();
    let initialized = false;

    async function loadProfile(userId: string) {
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
      return data ?? null;
    }

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

      if (!initialized) {
        initialized = true;
        setIsLoading(false);
      }
    });

    return () => {
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
