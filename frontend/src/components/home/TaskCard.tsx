// src/components/home/TaskCard.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Check, Clock, Trash2, Edit2 } from "lucide-react";
import type { Task } from "../../types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getBgColor = (c: string) => {
    switch (c) {
      case "yellow":
        return "#fdf08a";
      case "purple":
        return "#d8b4fe";
      case "blue":
        return "#bfdbfe";
      case "green":
        return "#bbf7d0";
      default:
        return "#fdf08a";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{ backgroundColor: getBgColor(task.color) }}
      className="p-5 rounded-lg shadow-sm relative group flex flex-col h-full min-h-[160px]"
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleStatus(task.id)}
            className={`w-5 h-5 rounded flex items-center justify-center border transition-colors cursor-pointer ${
              task.completed
                ? "bg-black border-black text-white"
                : "border-black/30 bg-black/5 hover:bg-black/10"
            }`}
          >
            {task.completed && <Check size={14} />}
          </button>
          <h3
            className={`font-medium ${task.completed ? "line-through text-gray-600" : "text-black"}`}
          >
            {task.title}
          </h3>
        </div>

        {/* 3-dot Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-700 hover:bg-black/10 rounded cursor-pointer"
          >
            <MoreHorizontal size={18} />
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-full mt-1 w-32 bg-[var(--input-bg)] rounded-md shadow-lg border border-[var(--input-border)] z-10 overflow-hidden"
              >
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onEdit(task);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[var(--text-main)] hover:bg-[var(--bg-secondary)] flex items-center gap-2 cursor-pointer"
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDelete(task.id);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Description */}
      <p
        className={`text-sm mb-6 line-clamp-4 flex-grow ${task.completed ? "text-gray-500" : "text-gray-700"}`}
      >
        {task.description}
      </p>

      {/* Footer / Timing */}
      <div className="flex items-center text-xs text-gray-700 font-medium mt-auto">
        <Clock size={14} className="mr-1.5" />
        {task.startTime} - {task.endTime}
      </div>
    </motion.div>
  );
}
