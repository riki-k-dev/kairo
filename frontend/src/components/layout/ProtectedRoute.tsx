// frontend/src/components/layout/ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    // TODO: add a proper spinner UI later
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[var(--bg-primary)]">
        <span className="text-[var(--text-muted)]">Loading workspace...</span>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
