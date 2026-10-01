// src/components/ui/ThemeToggle.tsx

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { themeMode, toggTheme } = useTheme();

  // const testToggle = false;

  return (
    <button
      type="button"
      className={`p-2 bg-[var(--input-bg)] rounded shadow-sm border border-[var(--input-border)] hover:opacity-80 transition-all cursor-pointer ${className}`}
      onClick={toggTheme}
    >
      {themeMode === "light" ? (
        <Moon size={20} className="text-[var(--text-muted)]" />
      ) : (
        <Sun size={20} className="text-[var(--text-muted)]" />
      )}
    </button>
  );
}
