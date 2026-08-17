import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isReady } = useAuth();
  const location = useLocation();

  if (!isReady) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
