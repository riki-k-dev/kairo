// src/components/ui/Button1.tsx

// Button for authentication forms

import type { ReactNode } from "react";

interface Button1Props {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button1({
  children,
  type = "button",
  disabled = false,
  className = "",
  onClick,
}: Button1Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded py-3 mt-2 hover:opacity-90 transition-colors cursor-pointer disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
