// src/pages/Home.tsx

import { useState } from "react";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  ListTodo,
  Check,
  ClockAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import TaskCard from "../components/home/TaskCard";
import TaskModal from "../components/home/TaskModal";
import ThemeToggle from "../components/ui/ThemeToggle";
import SearchBar from "../components/ui/SearchBar";
import Calendar from "../components/ui/Calendar";
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

  const [selDate, setSelDate] = useState<Date>(new Date());
  const [showCal, setShowCal] = useState(false);

  const displayDateStr = selDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // handles both create and edit saves
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

  const handleDatePicked = (d: Date) => {
    setSelDate(d);
    setShowCal(false);
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
      <div className="flex justify-between items-start w-full mb-13 -mt-3">
        <div>
          <h1 className="text-3xl mb-1 heading-font text-[var(--text-main)]">
            Hey, Riki 👋🏻
          </h1>
          <p className="text-[var(--text-muted)] italic font-serif">
            Let's make progress today!
          </p>
        </div>

        {/* ThemeToggle */}
        <ThemeToggle className="mt-1" />
      </div>

      {/* Calendar & Searchbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0 pb-5 mb-8 border-b border-[var(--input-border)]">
        <div className="relative w-full sm:w-auto">
          <div
            className="text-sm font-medium inline-flex items-center cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors select-none"
            onClick={() => setShowCal(!showCal)}
          >
            {displayDateStr}
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

          {/* Calendar */}
          {showCal && (
            <Calendar selectedDate={selDate} onSelect={handleDatePicked} />
          )}
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-auto">
          <SearchBar value={searchQ} onChange={setSearchQ} />
        </div>
      </div>

      {/* Main body */}
      <div className="w-full flex-1">
        <div className="flex w-full sm:w-max bg-[var(--input-bg)] rounded-lg shadow-sm border border-[var(--input-border)] mb-8 p-1 mx-auto sm:mx-0 overflow-x-auto">
          {(["To Do", "Completed", "Pending"] as FilterType[]).map((tab) => {
            const isActive = filterStr === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilterStr(tab)}
                className={`relative flex flex-1 sm:flex-none justify-center items-center px-3 sm:px-5 py-2 rounded-md text-sm whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "text-[var(--btn-primary-text)] font-medium"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-filter-tab"
                    className="absolute inset-0 bg-[var(--btn-primary-bg)] rounded-md"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{ zIndex: 0 }}
                  />
                )}

                <span className="relative z-10 flex items-center">
                  {tab === "Completed" && <Check size={15} className="mr-2" />}
                  {tab === "Pending" && (
                    <ClockAlert size={15} className="mr-2" />
                  )}
                  {tab === "To Do" && <ListTodo size={15} className="mr-2" />}
                  {tab}
                </span>
              </button>
            );
          })}
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
              No tasks found for {displayDateStr}. Time to relax or create a new
              one!
            </div>
          )}
        </div>
      </div>

      <button
        onClick={openCreate}
        className="fixed bottom-9 right-8 md:right-12 lg:right-16 w-14 h-14 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-full shadow-xl flex items-center justify-center hover:scale-105 hover:opacity-90 transition-all z-20 cursor-pointer"
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
