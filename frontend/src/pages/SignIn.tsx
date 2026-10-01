// src/pages/SignIn.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";

export default function SignIn() {
  // form states
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [showPass, setShowPass] = useState(false);

  // handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("login attempt:", emailVal);
  };

  return (
    <AuthLayout>
      {/* Page Titles */}
      <div className="mb-8">
        <h1 className="text-4xl mb-3 heading-font text-[var(--text-main)] leading-tight transition-colors">
          Sign in to your
          <br />
          workspace
        </h1>
        {" "}
        <p className="text-[var(--text-muted)] text-sm leading-relaxed transition-colors">
          Welcome back! Sign in to manage your tasks, track your
          <br />
          daily progress, and stay productive.
        </p>
      </div>

      {/* Signin Form */}
      <form onSubmit={handleLogin} className="space-y-5">
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

        <button
          type="submit"
          className="w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded py-3 mt-2 hover:opacity-90 transition-colors cursor-pointer"
        >
          Sign in
        </button>
      </form>

      {/* Footer Link */}
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
