// frontend/src/pages/NotFound.tsx

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ThemeToggle from "../components/ui/ThemeToggle";
import logoImg from "../assets/l2.png";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] transition-colors duration-300">
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 md:px-12 lg:px-16 w-full max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity -ml-2"
        >
          <img src={logoImg} alt="Kairo" className="w-17 h-17 object-contain" />
          <span className="heading-font text-3xl font-medium tracking-tight text-[var(--text-main)] -ml-2">
            Kairo
          </span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main 404 Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-24 text-center">
        <h1 className="text-[120px] md:text-[160px] font-light leading-none tracking-tighter select-none mb-2">
          <span className="text-[#c084fc]">4</span>
          <span className="text-[var(--text-main)]">0</span>
          <span className="text-[#fef08a]">4</span>
        </h1>

        <h2 className="text-xl md:text-2xl font-medium text-[var(--text-main)] mb-3">
          Page not found
        </h2>

        <p className="text-[var(--text-muted)] text-xs md:text-base max-w-full mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-transparent dark:border-[var(--input-border)] px-6 py-2.5 rounded text-sm hover:opacity-90 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer font-medium"
        >
          Go to Home Page <ArrowRight size={16} />
        </Link>
      </main>
    </div>
  );
}
