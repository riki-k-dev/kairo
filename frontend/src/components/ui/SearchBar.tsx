// src/components/ui/SearchBar.tsx

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search List",
}: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-72">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-4 py-2 rounded bg-[var(--input-bg)] border border-[var(--input-border)] text-sm text-[var(--text-main)] shadow-sm focus:outline-none focus:border-gray-400 transition-colors"
      />
    </div>
  );
}
