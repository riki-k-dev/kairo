// src/components/auth/AuthLayout.tsx

import type { ReactNode } from "react";
import { Sun, Moon } from "lucide-react";
import leftBannerImg from "../../assets/leftBannerImg.jpg";
import logoImg from "../../assets/l2.png";
import { useTheme } from "../ThemeProvider";

interface AuthLayoutProps {
  children: ReactNode;
}

// split-screen layout for Signup & Signin pages
export default function AuthLayout({ children }: AuthLayoutProps) {
  // pulling global theme state and toggle function
  const { themeMode, toggTheme } = useTheme();

  return (
    <div className="flex h-screen w-full bg-[var(--bg-primary)] overflow-hidden transition-colors duration-300">
      {/* Left side */}
      <div className="hidden lg:block lg:w-1/2 p-4 h-full">
        <div className="h-full w-full bg-[#d9d9d9] rounded overflow-hidden relative">
          <img
            src={leftBannerImg}
            alt="Kairo Workspace"
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex flex-col px-8 py-8 md:px-16 lg:px-24 h-full">
        {/* Logo and Theme Toggle */}
        <div className="flex justify-between items-center shrink-0">
          <div className="flex items-center cursor-pointer">
            <div className="flex items-center justify-center">
              <img
                src={logoImg}
                alt="Kairo Logo"
                className="w-15 h-15 object-contain"
              />
            </div>
            <span className="heading-font text-2xl font-medium tracking-tight text-(--text-main) -ml-2">
              Kairo
            </span>
          </div>

          <button
            type="button"
            className="p-2 bg-[var(--input-bg)] rounded shadow-sm border border-[var(--input-border)] hover:opacity-80 transition-all cursor-pointer"
            onClick={toggTheme}
          >
            {themeMode === "light" ? (
              <Moon size={20} className="text-[var(--text-muted)]" />
            ) : (
              <Sun size={20} className="text-[var(--text-muted)]" />
            )}
          </button>
        </div>

        {/* Dynamic Form Wrapper */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto py-20 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
