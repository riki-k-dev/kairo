// frontend/src/components/profile/ActivityInsights.tsx

import { CheckCircle2, Clock, ListTodo } from "lucide-react";
import HeatMap from "@uiw/react-heat-map";
import type { Task } from "../../types";

interface ActivityInsightsProps {
  tasks: Task[];
}

export default function ActivityInsights({ tasks }: ActivityInsightsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // 1. Convert data to @uiw/react-heat-map format (YYYY/MM/DD)
  const completionMap: Record<string, number> = {};

  tasks.forEach((t) => {
    if (t.completed && t.completedAt) {
      const d = new Date(t.completedAt);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}/${mm}/${dd}`;

      completionMap[dateStr] = (completionMap[dateStr] || 0) + 1;
    }
  });

  const heatmapValues = Object.keys(completionMap).map((key) => ({
    date: key,
    count: completionMap[key],
  }));

  // 2. Calculate start date (6 months ago)
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);

  return (
    <div className="bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-[var(--input-border)]">
        <h2 className="text-lg font-medium text-[var(--text-main)]">
          Activity Insights
        </h2>
      </div>

      <div className="p-6 md:p-8">
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded border border-[var(--input-border)] bg-[var(--bg-primary)] flex items-center gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
              <ListTodo size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">
                Total Tasks
              </p>
              <p className="text-2xl font-semibold text-[var(--text-main)]">
                {totalTasks}
              </p>
            </div>
          </div>
          <div className="p-4 rounded border border-[var(--input-border)] bg-[var(--bg-primary)] flex items-center gap-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">
                Completed
              </p>
              <p className="text-2xl font-semibold text-[var(--text-main)]">
                {completedTasks}
              </p>
            </div>
          </div>
          <div className="p-4 rounded border border-[var(--input-border)] bg-[var(--bg-primary)] flex items-center gap-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">
                Pending
              </p>
              <p className="text-2xl font-semibold text-[var(--text-main)]">
                {pendingTasks}
              </p>
            </div>
          </div>
        </div>

        {/* GitHub Style Heatmap Component */}
        <div>
          <p className="text-sm font-medium text-[var(--text-main)] mb-4">
            Task Contributions
          </p>
          <div className="p-5 rounded border border-[var(--input-border)] bg-[var(--bg-primary)] overflow-x-auto flex justify-center">
            <div className="min-w-max">
              <HeatMap
                value={heatmapValues}
                width={750}
                startDate={startDate}
                weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
                monthPlacement="top"
                rectProps={{ rx: 2 }}
                style={
                  {
                    color: "var(--text-main)",
                    "--rhm-rect": "var(--bg-secondary)",
                  } as React.CSSProperties
                }
                panelColors={{
                  0: "var(--bg-secondary)",
                  1: "#c6e48b", // Light green (1 task)
                  2: "#7bc96f", // Medium green (2 tasks)
                  3: "#239a3b", // Dark green (3 tasks)
                  4: "#196127", // Darkest green (4+ tasks)
                }}
                rectRender={(props, data) => (
                  <rect
                    {...props}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <title>
                      {data.count || 0} tasks completed on {data.date}
                    </title>
                  </rect>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
