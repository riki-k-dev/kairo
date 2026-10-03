// frontend/src/context/AuthContext.tsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import api from "../services/api";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (token: string, userData: User) => void;
  logoutUser: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("kairo_token"),
  );
  const [isLoading, setIsLoading] = useState(true);

  const logoutUser = () => {
    localStorage.removeItem("kairo_token");
    setToken(null);
    setUser(null);
  };

  const loginUser = (newToken: string, userData: User) => {
    localStorage.setItem("kairo_token", newToken);
    setToken(newToken);
    setUser(userData);
  };

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await api.get("/users/me");
        setUser(res.data.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // console.error("Auth check failed, logging out", e);
        logoutUser();
      } finally {
        setIsLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, logoutUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
