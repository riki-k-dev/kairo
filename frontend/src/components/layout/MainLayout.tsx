// frontend/src/components/layout/MainLayout.tsx

import { type ReactNode } from "react";
import Sidebar from "./Sidebar";
import type { Task } from "../../types";

interface LayoutProps {
  children: ReactNode;
  tasks?: Task[];
}

export default function MainLayout({ children, tasks = [] }: LayoutProps) {
  return (
    <div className="flex h-screen w-full bg-[var(--bg-primary)] overflow-hidden transition-colors duration-300">
      <Sidebar tasks={tasks} />

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto">
        <div className="px-8 md:px-12 lg:px-16 py-12 max-w-6xl mx-auto h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
