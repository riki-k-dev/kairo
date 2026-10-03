// src/types/index.ts

// User structure
export interface User {
  id: string;
  name: string;
  email: string;
}

// Task structure
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  color: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  completedAt?: string;
}

// UI specific type for our filter tabs
export type FilterType = "All" | "To Do" | "Completed" | "Pending";
