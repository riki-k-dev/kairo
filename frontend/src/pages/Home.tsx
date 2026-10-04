// frontend/src/pages/Home.tsx

import { useState, useEffect } from "react";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  ListTodo,
  Check,
  ClockAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import TaskCard from "../components/home/TaskCard";
import TaskModal from "../components/home/TaskModal";
import ThemeToggle from "../components/ui/ThemeToggle";
import SearchBar from "../components/ui/SearchBar";
import Calendar from "../components/ui/Calendar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import type { Task, FilterType } from "../types";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [filterStr, setFilterStr] = useState<FilterType>("To Do");
  const [searchQ, setSearchQ] = useState("");

  const [isModOpen, setIsModOpen] = useState(false);
  const [currTaskEdit, setCurrTaskEdit] = useState<Task | null>(null);

  const [selDate, setSelDate] = useState<Date>(new Date());
  const [showCal, setShowCal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const displayDateStr = selDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        if (res.data.success) {
          setTasksList(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (taskData.id) {
        const res = await api.patch(`/tasks/${taskData.id}`, taskData);
        if (res.data.success) {
          setTasksList((prev) =>
            prev.map((t) =>
              t.id === taskData.id ? ({ ...t, ...res.data.data } as Task) : t,
            ),
          );
        }
      } else {
        const res = await api.post("/tasks", taskData);
        if (res.data.success) {
          setTasksList((prev) => [res.data.data, ...prev]);
        }
      }
    } catch (err) {
      console.error("Error saving task:", err);
      alert("Failed to save task. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasksList((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Could not delete task", err);
    }
  };

  const handleToggleState = async (id: string) => {
    const taskToToggle = tasksList.find((t) => t.id === id);
    if (!taskToToggle) return;

    const newStatus = !taskToToggle.completed;

    setTasksList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: newStatus } : t)),
    );

    try {
      await api.patch(`/tasks/${id}`, { completed: newStatus });
    } catch (err) {
      setTasksList((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !newStatus } : t)),
      );
      console.error("Failed to toggle task state", err);
    }
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

  // search and filter logic
  const filteredTasks = tasksList.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQ.toLowerCase()) ||
      (t.description &&
        t.description.toLowerCase().includes(searchQ.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterStr === "Completed") return t.completed;
    if (filterStr === "Pending" || filterStr === "To Do") return !t.completed;

    return true;
  });

  return (
    <MainLayout tasks={tasksList}>
      {/* header */}
      <div className="flex justify-between items-start w-full mb-13 -mt-3">
        <div>
          <h1 className="text-3xl mb-1 heading-font text-[var(--text-main)]">
            Hey, {user?.name ? user?.name?.split(" ")[0] : "there"} 👋🏻
          </h1>
          <p className="text-[var(--text-muted)] italic font-serif">
            Let's make progress today!
          </p>
        </div>
        <ThemeToggle className="mt-1" />
      </div>

      {/* date and search bar */}
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
          {showCal && (
            <Calendar selectedDate={selDate} onSelect={handleDatePicked} />
          )}
        </div>
        <div className="w-full sm:w-auto">
          <SearchBar value={searchQ} onChange={setSearchQ} />
        </div>
      </div>

      {/* filter tabs */}
      <div className="w-full flex-1">
        <div className="flex w-full sm:w-max bg-[var(--input-bg)] rounded-lg shadow-sm border border-[var(--input-border)] mb-8 p-1 mx-auto sm:mx-0 overflow-hidden">
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

        {isLoading ? (
          <div className="flex justify-center py-12 text-[var(--text-muted)]">
            Loading tasks...
          </div>
        ) : (
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
                No tasks found for {displayDateStr}. Time to relax or create a
                new one!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      {/* Mobile Profile Button */}
      <div className="md:hidden fixed bottom-9 left-8 z-20">
        <button
          onClick={() => navigate("/profile")}
          className="w-14 h-14 bg-[var(--bg-secondary)] border border-[var(--input-border)] text-[var(--text-main)] rounded-full shadow-xl flex items-center justify-center text-xl font-medium uppercase hover:scale-105 transition-all cursor-pointer"
        >
          {user?.name ? user.name.charAt(0) : "U"}
        </button>
      </div>

      {/* Create Task Button */}
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
