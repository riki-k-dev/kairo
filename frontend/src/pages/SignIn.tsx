// frontend/src/pages/SignIn.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import Button1 from "../components/ui/Button1";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailVal || !passVal) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post("/auth/signin", {
        email: emailVal,
        password: passVal,
      });

      if (res.data.success) {
        loginUser(res.data.data.token, res.data.data.user);

        navigate("/", { replace: true });
      }
    } catch (err: unknown) {
      const backendErr =
        err instanceof Error ? err.message : "Something went wrong while signing in";
      setErrorMsg(backendErr);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="text-4xl mb-3 heading-font text-[var(--text-main)] leading-tight transition-colors">
          Sign in to your
          <br />
          workspace
        </h1>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed transition-colors">
          Welcome back! Sign in to manage your tasks, track your
          <br />
          daily progress, and stay productive.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-500 text-sm rounded border border-red-100">
            {errorMsg}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm text-[var(--text-main)] block transition-colors">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
            className="w-full px-4 py-2.5 rounded border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-main)] focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-[var(--text-main)] block transition-colors">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={passVal}
              onChange={(e) => setPassVal(e.target.value)}
              className="w-full px-4 py-2.5 rounded border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-main)] focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:opacity-80 transition-colors cursor-pointer"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button1 type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button1>
      </form>

      <div className="mt-6 text-center text-sm text-[var(--text-muted)] transition-colors">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-[var(--text-main)] font-medium hover:underline transition-colors"
        >
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
}
