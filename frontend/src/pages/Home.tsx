// src/pages/Home.tsx

import { useState } from "react";
import {
  Plus,
  Search,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import TaskCard from "../components/home/TaskCard";
import TaskModal from "../components/home/TaskModal";
import { useTheme } from "../components/ThemeProvider";
import type { Task, FilterType } from "../types";

const MOCK_TASKS: Task[] = [
  {
    id: "t1",
    title: "Create a Planer",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae.",
    completed: false,
    color: "yellow",
    startTime: "12:30 PM",
    endTime: "1:00 PM",
    createdAt: new Date().toISOString(),
  },
  {
    id: "t2",
    title: "Team Meeting",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.",
    completed: false,
    color: "purple",
    startTime: "2:30 PM",
    endTime: "3:00 PM",
    createdAt: new Date().toISOString(),
  },
];

export default function Home() {
  const [tasksList, setTasksList] = useState<Task[]>(MOCK_TASKS);
  const [filterStr, setFilterStr] = useState<FilterType>("To Do");
  const [searchQ, setSearchQ] = useState("");

  const [isModOpen, setIsModOpen] = useState(false);
  const [currTaskEdit, setCurrTaskEdit] = useState<Task | null>(null);
  const [showCal, setShowCal] = useState(false);

  const { themeMode, toggTheme } = useTheme();

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (taskData.id) {
      setTasksList((prev) =>
        prev.map((t) =>
          t.id === taskData.id ? ({ ...t, ...taskData } as Task) : t,
        ),
      );
    } else {
      const newTask: Task = {
        ...(taskData as Task),
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
      };
      setTasksList((prev) => [newTask, ...prev]);
    }
  };

  const handleDelete = (id: string) => {
    setTasksList((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleState = (id: string) => {
    setTasksList((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      }),
    );
  };

  const openCreate = () => {
    setCurrTaskEdit(null);
    setIsModOpen(true);
  };

  const openEdit = (t: Task) => {
    setCurrTaskEdit(t);
    setIsModOpen(true);
  };

  const filteredTasks = tasksList.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQ.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQ.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStr === "Completed") return t.completed;
    if (filterStr === "Pending") return !t.completed;
    if (filterStr === "To Do") return !t.completed;

    return true;
  });

  return (
    <MainLayout>
      {/* Header & Toggle */}
      <div className="flex justify-between items-start w-full mb-10">
        <div>
          <h1 className="text-3xl mb-1 heading-font text-[var(--text-main)]">
            Hey, Riki 👋
          </h1>
          <p className="text-[var(--text-muted)] italic font-serif">
            Let's make progress today!
          </p>
        </div>

        <button
          type="button"
          className="p-2 bg-[var(--input-bg)] rounded shadow-sm border border-[var(--input-border)] hover:opacity-80 transition-all cursor-pointer mt-1"
          onClick={toggTheme}
        >
          {themeMode === "light" ? (
            <Moon size={20} className="text-[var(--text-muted)]" />
          ) : (
            <Sun size={20} className="text-[var(--text-muted)]" />
          )}
        </button>
      </div>

      {/* Calendar & Searchbar */}
      <div className="flex justify-between items-center w-full pb-5 mb-8 border-b border-[var(--input-border)]">
        <div className="relative">
          <div
            className="text-sm font-medium inline-flex items-center cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors select-none"
            onClick={() => setShowCal(!showCal)}
          >
            {today}
            {showCal ? (
              <ChevronDown
                size={16}
                className="ml-2 text-[var(--text-muted)]"
              />
            ) : (
              <ChevronRight
                size={16}
                className="ml-2 text-[var(--text-muted)]"
              />
            )}
          </div>

          {showCal && (
            <div className="absolute top-full left-0 mt-3 bg-[var(--input-bg)] border border-[var(--input-border)] shadow-lg rounded p-4 z-30 w-72">
              <div className="text-center font-medium mb-3 text-[var(--text-main)]">
                October 2026
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-xs text-[var(--text-muted)] mb-1">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>
              <div className="grid grid-cols-7 gap-y-2 text-center text-sm font-medium text-[var(--text-main)]">
                <div className="text-[var(--text-muted)] opacity-50">27</div>
                <div className="text-[var(--text-muted)] opacity-50">28</div>
                <div className="text-[var(--text-muted)] opacity-50">29</div>
                <div className="text-[var(--text-muted)] opacity-50">30</div>
                <div className="bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-md cursor-pointer hover:opacity-80 transition-colors w-7 h-7 mx-auto flex items-center justify-center">
                  1
                </div>
                <div className="cursor-pointer hover:bg-[var(--bg-secondary)] rounded-md w-7 h-7 mx-auto flex items-center justify-center">
                  2
                </div>
                <div className="cursor-pointer hover:bg-[var(--bg-secondary)] rounded-md w-7 h-7 mx-auto flex items-center justify-center">
                  3
                </div>
                <div className="cursor-pointer hover:bg-[var(--bg-secondary)] rounded-md w-7 h-7 mx-auto flex items-center justify-center">
                  4
                </div>
                <div className="cursor-pointer hover:bg-[var(--bg-secondary)] rounded-md w-7 h-7 mx-auto flex items-center justify-center">
                  5
                </div>
                <div className="cursor-pointer hover:bg-[var(--bg-secondary)] rounded-md w-7 h-7 mx-auto flex items-center justify-center">
                  6
                </div>
                <div className="cursor-pointer hover:bg-[var(--bg-secondary)] rounded-md w-7 h-7 mx-auto flex items-center justify-center">
                  7
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            placeholder="Search List"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded bg-[var(--input-bg)] border border-[var(--input-border)] text-sm text-[var(--text-main)] shadow-sm focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
      </div>

      {/* Main body */}
      <div className="w-full flex-1">
        {/* Filter Tabs */}
        <div className="flex bg-[var(--input-bg)] rounded-lg shadow-sm border border-[var(--input-border)] w-max mb-8 p-1">
          {(["To Do", "Completed", "Pending"] as FilterType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStr(tab)}
              className={`px-5 py-2 rounded-md text-sm transition-all cursor-pointer ${
                filterStr === tab
                  ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-medium"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              {tab === "Completed" && "✓ "}
              {tab === "Pending" && "🕒 "}
              {tab === "To Do" && "❉ "}
              {tab}
            </button>
          ))}
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={openEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleState}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-[var(--text-muted)]">
              No tasks found. Time to relax or create a new one!
            </div>
          )}
        </div>
      </div>

      <button
        onClick={openCreate}
        className="fixed bottom-8 right-8 md:right-12 lg:right-16 w-14 h-14 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-full shadow-xl flex items-center justify-center hover:scale-105 hover:opacity-90 transition-all z-20 cursor-pointer"
      >
        <Plus size={24} />
      </button>

      <TaskModal
        isOpen={isModOpen}
        onClose={() => setIsModOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={currTaskEdit}
      />
    </MainLayout>
  );
}
