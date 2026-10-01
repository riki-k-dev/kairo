// src/components/home/TaskModal.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Task } from "../../types";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  taskToEdit?: Task | null;
}

const COLORS = ["yellow", "purple", "blue", "green"];

// Creating and Editing Tasks
export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  taskToEdit,
}: TaskModalProps) {
  // form state
  const [tTitle, setTTitle] = useState("");
  const [tDesc, setTDesc] = useState("");
  const [sTime, setSTime] = useState("");
  const [eTime, setETime] = useState("");
  const [selColor, setSelColor] = useState("yellow");

  useEffect(() => {
    if (taskToEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTTitle(taskToEdit.title);
      setTDesc(taskToEdit.description);
      setSTime(taskToEdit.startTime);
      setETime(taskToEdit.endTime);
      setSelColor(taskToEdit.color);
    } else {
      setTTitle("");
      setTDesc("");
      setSTime("10:00 AM");
      setETime("11:00 AM");
      setSelColor("yellow");
    }
  }, [taskToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tTitle.trim()) return;

    onSave({
      ...(taskToEdit && { id: taskToEdit.id }),
      title: tTitle,
      description: tDesc,
      startTime: sTime,
      endTime: eTime,
      color: selColor,
      completed: taskToEdit ? taskToEdit.completed : false,
    });
    onClose();
  };

  // let fabAnimReady = true;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.1, x: "40vw", y: "40vh" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.1, x: "40vw", y: "40vh" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 w-full max-w-md bg-[var(--bg-primary)] rounded-xl shadow-2xl z-50 overflow-hidden border border-[var(--input-border)]"
          >
            <div className="flex justify-between items-center p-5 border-b border-[var(--input-border)]">
              <h2 className="heading-font text-xl font-medium text-[var(--text-main)]">
                {taskToEdit ? "Edit Task" : "Create a Task"}
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-[var(--bg-secondary)] text-[var(--text-main)] rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Task title..."
                  value={tTitle}
                  onChange={(e) => setTTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-main)] focus:outline-none focus:border-gray-400"
                  autoFocus
                />
              </div>

              <div>
                <textarea
                  placeholder="Task description..."
                  value={tDesc}
                  onChange={(e) => setTDesc(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 rounded bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-main)] focus:outline-none focus:border-gray-400 resize-none"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-[var(--text-muted)] mb-1 block">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={sTime}
                    onChange={(e) => setSTime(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-main)] text-sm focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-[var(--text-muted)] mb-1 block">
                    End Time
                  </label>
                  <input
                    type="text"
                    value={eTime}
                    onChange={(e) => setETime(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-main)] text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[var(--text-muted)] mb-2 block">
                  Card Color
                </label>
                <div className="flex gap-3">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelColor(c)}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer ${selColor === c ? "border-black scale-110" : "border-transparent"}`}
                      style={{
                        backgroundColor:
                          c === "yellow"
                            ? "#fdf08a"
                            : c === "purple"
                              ? "#d8b4fe"
                              : c === "blue"
                                ? "#bfdbfe"
                                : "#bbf7d0",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-[var(--input-border)] flex justify-end">
                <button
                  type="submit"
                  disabled={!tTitle.trim()}
                  className="bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-6 py-2 rounded font-medium disabled:opacity-50 hover:opacity-80 transition-colors cursor-pointer"
                >
                  {taskToEdit ? "Save Changes" : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
