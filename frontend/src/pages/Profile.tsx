// frontend/src/pages/Profile.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import ThemeToggle from "../components/ui/ThemeToggle";
import ProfileDetails from "../components/profile/ProfileDetails";
import ActivityInsights from "../components/profile/ActivityInsights";
import DangerZone from "../components/profile/DangerZone";
import api from "../services/api";
import type { Task } from "../types";

export default function Profile() {
  const [tasksList, setTasksList] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        if (res.data.success) {
          setTasksList(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch tasks for profile", err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <MainLayout tasks={tasksList}>
      <div className="flex justify-between items-start w-full mb-10 -mt-3">
        <Link
          to="/"
          className="flex items-center text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors mt-2 cursor-pointer"
          style={{ fontFamily: "'Figtree', sans-serif" }}
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="text-lg font-medium">back to home</span>
        </Link>
        <ThemeToggle className="mt-1" />
      </div>

      <div className="flex flex-col gap-6 max-w-4xl pb-16">
        <ProfileDetails />
        <ActivityInsights tasks={tasksList} />
        <DangerZone />
      </div>
    </MainLayout>
  );
}
