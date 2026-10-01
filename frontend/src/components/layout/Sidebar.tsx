// src/components/layout/Sidebar.tsx

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ListTodo, LogOut, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "../../assets/l2.png";

export default function Sidebar() {
  const loc = useLocation();

  const [listOpen, setListOpen] = useState(true);

  const subTasksList = [
    "Team Meeting",
    "Work on Branding",
    "Make a Report for client",
    "Create a planer",
  ];

  // logout action mock
  const handleLogOut = () => {
    // console.log("User logged out");
    window.location.href = "/signin";
  };

  const listContainerVars = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 },
    },
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
    hidden: { opacity: 0, x: -10 }, // Thoda left se slide in effect
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  return (
    <aside className="w-64 h-screen bg-[var(--bg-primary)] border-r border-[var(--input-border)] flex flex-col justify-between py-13 px-4 hidden md:flex">
      {/* Top Section */}
      <div>
        {/* Brand Header */}
        <div className="flex items-center -mx-2 -mt-4 -mb-2">
          <img src={logoImg} alt="Kairo" className="w-17 h-17 object-contain" />
          <span className="heading-font text-3xl font-medium tracking-tight text-[var(--text-main)] -ml-2">
            Kairo
          </span>
        </div>

        {/* Brand Tagline */}
        <p className="text-xs text-[var(--text-muted)] mb-8 px-2 leading-relaxed">
          A simple, joyful way to take control of your time and routines
        </p>

        {/* Nav Links */}
        <nav className="space-y-1">
          {/* Main List Toggle Button */}
          <div
            onClick={() => setListOpen(!listOpen)}
            className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer select-none ${
              loc.pathname === "/"
                ? "text-[var(--text-main)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <div className="flex items-center text-sm font-medium">
              <ListTodo size={18} className="mr-3" />
              To-do list
            </div>
            {listOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>

          {/* Nested Sub-tasks Tree List */}
          <AnimatePresence initial={false}>
            {listOpen && (
              <motion.ul
                variants={listContainerVars}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="ml-6 border-l-2 border-[var(--input-border)] mt-1 mb-4 space-y-1 overflow-hidden"
              >
                {subTasksList.map((st, idx) => (
                  <motion.li
                    key={idx}
                    variants={listItemVars}
                    className="relative pl-4 py-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer transition-colors"
                  >
                    <span className="absolute left-0 w-3 border-t-2 border-[var(--input-border)] top-1/2 -translate-y-1/2"></span>
                    <span className="truncate block pr-2">{st}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Bottom Section - User Profile */}
      <div className="flex items-center justify-between p-3 border border-[var(--input-border)] rounded-md bg-[var(--input-bg)] shadow-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[var(--bg-secondary)] rounded flex items-center justify-center text-sm font-medium text-[var(--text-main)] mr-3">
            R
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--text-main)] leading-none mb-1">
              Riki Kashyap
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">
              my@example.com
            </span>
          </div>
        </div>
        <button
          onClick={handleLogOut}
          className="text-[var(--text-muted)] hover:text-red-500 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
