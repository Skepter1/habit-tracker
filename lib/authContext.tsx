import { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; // Twoja ścieżka do klienta

type AuthContextType = {
  session: Session | null;
  user: User | null;
  initialized: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  initialized: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // 1. Sprawdź czy jest już jakaś sesja w pamięci telefonu
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setInitialized(true);
    };

    getInitialSession();

    // 2. Nasłuchuj zmian (logowanie, wylogowanie, odświeżenie tokena)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setInitialized(true);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
