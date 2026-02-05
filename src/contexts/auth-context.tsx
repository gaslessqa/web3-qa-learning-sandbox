"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { getClient } from "@/lib/supabase/client";
import type { User, Session, AuthError } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (
    email: string,
    password: string,
    metadata?: { display_name?: string }
  ) => Promise<{ error: AuthError | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signInWithOAuth: (
    provider: "google" | "github"
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  updateProfile: (
    updates: Partial<Profile>
  ) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = getClient();

  // Fetch user profile from database
  const fetchProfile = useCallback(
    async (userId: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return data;
    },
    [supabase]
  );

  // Refresh profile data
  const refreshProfile = useCallback(async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  }, [user, fetchProfile]);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          const profileData = await fetchProfile(currentSession.user.id);
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (event === "SIGNED_IN" && newSession?.user) {
        const profileData = await fetchProfile(newSession.user.id);
        setProfile(profileData);
      } else if (event === "SIGNED_OUT") {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfile]);

  // Sign up with email and password
  const signUp = async (
    email: string,
    password: string,
    metadata?: { display_name?: string }
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    return { error };
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  // Sign in with OAuth provider
  const signInWithOAuth = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    return { error };
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  // Update user profile
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      return { error: new Error("No user logged in") };
    }

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (!error) {
      await refreshProfile();
    }

    return { error };
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
