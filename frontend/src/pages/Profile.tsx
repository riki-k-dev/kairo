// frontend/src/pages/Profile.tsx

import { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import ThemeToggle from "../components/ui/ThemeToggle";
import ProfileDetails from "../components/profile/ProfileDetails";
import ActivityInsights from "../components/profile/ActivityInsights";
import DangerZone from "../components/profile/DangerZone";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import type { Task } from "../types";

export default function Profile() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth();
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
        <div>
          <h1 className="text-3xl mb-1 heading-font text-[var(--text-main)]">
            Profile Settings
          </h1>
          <p className="text-[var(--text-muted)] italic font-serif">
            Manage your details and view activity
          </p>
        </div>
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
