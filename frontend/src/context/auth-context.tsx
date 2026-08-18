import { createContext, useContext, useState, type ReactNode } from "react";
import * as api from "@/lib/api";

const STORAGE_KEY = "flowsync:auth";

interface StoredSession {
  user: api.User;
  token: string;
}

interface AuthContextValue {
  user: api.User | null;
  token: string | null;
  isAuthenticated: boolean;
  signup: (input: api.SignupInput) => Promise<void>;
  login: (input: api.LoginInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function isStoredSession(value: unknown): value is StoredSession {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<StoredSession>;
  return (
    typeof candidate.token === "string" &&
    candidate.token.length > 0 &&
    typeof candidate.user === "object" &&
    candidate.user !== null
  );
}

function readStoredSession(): StoredSession | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isStoredSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<StoredSession | null>(() =>
    readStoredSession(),
  );

  function persist(next: StoredSession | null) {
    setSession(next);
    if (next) {
      // Deuda técnica aceptada: el token queda en localStorage en texto
      // plano, expuesto a XSS. No hay soporte de cookie httpOnly en el
      // backend actual; aceptable para este proyecto de entrenamiento.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  async function signup(input: api.SignupInput) {
    const { user, token } = await api.signup(input);
    persist({ user, token });
  }

  async function login(input: api.LoginInput) {
    const { user, token } = await api.login(input);
    persist({ user, token });
  }

  async function logout() {
    if (session) {
      await api.logout(session.token).catch(() => undefined);
    }
    persist(null);
  }

  const value: AuthContextValue = {
    user: session?.user ?? null,
    token: session?.token ?? null,
    isAuthenticated: session !== null,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
