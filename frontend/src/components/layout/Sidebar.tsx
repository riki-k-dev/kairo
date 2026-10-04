// frontend/src/components/layout/Sidebar.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListTodo, LogOut, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "../../assets/l2.png";
import { useAuth } from "../../context/AuthContext";
import type { Task } from "../../types";

interface SidebarProps {
  tasks?: Task[];
}

export default function Sidebar({ tasks = [] }: SidebarProps) {
  const navigate = useNavigate();
  const [listOpen, setListOpen] = useState(true);

  const { user, logoutUser } = useAuth();

  const handleLogOut = () => {
    logoutUser();
    navigate("/signin", { replace: true });
  };

  const listContainerVars = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.2 } },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const listItemVars = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  return (
    <aside className="w-64 h-screen bg-[var(--bg-primary)] border-r border-[var(--input-border)] flex flex-col justify-between py-10 px-4 hidden md:flex">
      {/* Top Section */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2">
        <Link
          to="/"
          className="flex items-center -mx-2 -mt-4 -mb-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src={logoImg} alt="Kairo" className="w-17 h-17 object-contain" />
          <span className="heading-font text-3xl font-medium tracking-tight text-[var(--text-main)] -ml-2">
            Kairo
          </span>
        </Link>

        <p className="text-xs text-[var(--text-muted)] mb-8 px-2 leading-relaxed">
          A simple, joyful way to take control of your time and routines
        </p>

        <nav className="space-y-1">
          <div
            onClick={() => setListOpen(!listOpen)}
            className="flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center text-sm font-medium">
              <ListTodo size={18} className="mr-3" />
              To-do list
            </div>
            {listOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>

          <AnimatePresence initial={false}>
            {listOpen && (
              <motion.ul
                variants={listContainerVars}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="ml-6 border-l-2 border-[var(--input-border)] mt-1 mb-4 space-y-1 overflow-hidden"
              >
                {tasks.length > 0 ? (
                  tasks.map((t) => (
                    <motion.li
                      key={t.id}
                      variants={listItemVars}
                      className="relative pl-4 py-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer transition-colors"
                    >
                      <span className="absolute left-0 w-3 border-t-2 border-[var(--input-border)] top-1/2 -translate-y-1/2"></span>
                      <span className="truncate block pr-2" title={t.title}>
                        {t.title}
                      </span>
                    </motion.li>
                  ))
                ) : (
                  <motion.li
                    variants={listItemVars}
                    className="relative pl-4 py-1.5 text-xs text-[var(--text-muted)] italic"
                  >
                    <span className="absolute left-0 w-3 border-t-2 border-[var(--input-border)] top-1/2 -translate-y-1/2"></span>
                    No tasks yet
                  </motion.li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between p-3 border border-[var(--input-border)] rounded-md bg-[var(--input-bg)] shadow-sm shrink-0 mt-4 transition-colors dark:hover:border-gray-600">
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center overflow-hidden cursor-pointer flex-1"
        >
          <div className="w-8 h-8 shrink-0 bg-[var(--input-border)] rounded flex items-center justify-center text-sm font-medium text-[var(--text-main)] mr-3 uppercase transition-colors">
            {user?.name ? user.name.charAt(0) : "U"}
          </div>
          <div className="flex flex-col truncate pr-2">
            <span className="text-sm font-medium text-[var(--text-main)] leading-none mb-1 truncate">
              {user?.name || "User"}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] truncate">
              {user?.email || "loading..."}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogOut}
          title="Sign out"
          className="text-[var(--text-muted)] hover:text-red-500 transition-colors cursor-pointer shrink-0 ml-2"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
