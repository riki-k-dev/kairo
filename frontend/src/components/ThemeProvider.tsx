// src/components/ThemeProvider.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  themeMode: ThemeMode;
  toggTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("kairo-theme");
    return (saved as ThemeMode) || "light";
  });

  useEffect(() => {
    const rootEl = document.documentElement;

    if (themeMode === "dark") {
      rootEl.classList.add("dark");
    } else {
      rootEl.classList.remove("dark");
    }

    localStorage.setItem("kairo-theme", themeMode);
  }, [themeMode]);

  // toggle logic
  const toggTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
