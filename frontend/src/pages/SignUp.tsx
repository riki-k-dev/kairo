// src/pages/SignUp.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";

export default function SignUp() {
  // form states
  const [uName, setUname] = useState("");
  const [emailStr, setEmailStr] = useState("");
  const [pass, setPass] = useState("");

  const [showPass, setShowPass] = useState(false);

  // handle form submission
  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("form trigger:", uName, emailStr);
  };

  return (
    <AuthLayout>
      {/* Page Titles */}
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

      {/* Signup Form */}
      <form onSubmit={handleSub} className="space-y-5">
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
          Sign up
        </button>
      </form>

      {/* Footer Link */}
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
