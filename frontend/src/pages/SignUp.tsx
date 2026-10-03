// frontend/src/pages/SignUp.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import Button1 from "../components/ui/Button1";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { isAxiosError } from "axios";

export default function SignUp() {
  const [uName, setUname] = useState("");
  const [emailStr, setEmailStr] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uName || !emailStr || !pass) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post("/auth/signup", {
        name: uName,
        email: emailStr,
        password: pass,
      });

      if (res.data.success) {
        loginUser(res.data.data.token, res.data.data.user);
        navigate("/", { replace: true });
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.data?.errors) {
          setErrorMsg(err.response.data.errors.join(", "));
        } else {
          setErrorMsg(
            err.response?.data?.message || "Signup failed. Please try again.",
          );
        }
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="text-4xl mb-3 heading-font text-[var(--text-main)] leading-tight transition-colors">
          Sign up to your
          <br />
          workspace
        </h1>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed transition-colors">
          Join Kairo to organize your daily tasks, track your
          <br />
          progress, and take control of your time.
        </p>
      </div>

      <form onSubmit={handleSub} className="space-y-5">
        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-500 text-sm rounded border border-red-100">
            {errorMsg}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm text-[var(--text-main)] block transition-colors">
            Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={uName}
            onChange={(e) => setUname(e.target.value)}
            className="w-full px-4 py-2.5 rounded border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-main)] focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-[var(--text-main)] block transition-colors">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={emailStr}
            onChange={(e) => setEmailStr(e.target.value)}
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
              value={pass}
              onChange={(e) => setPass(e.target.value)}
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
          {isLoading ? "Creating account..." : "Sign up"}
        </Button1>
      </form>

      <div className="mt-6 text-center text-sm text-[var(--text-muted)] transition-colors">
        Already have an account?{" "}
        <Link
          to="/signin"
          className="text-[var(--text-main)] font-medium hover:underline transition-colors"
        >
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
