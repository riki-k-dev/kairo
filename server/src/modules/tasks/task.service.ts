// server/src/modules/tasks/task.service.ts

import { eq, and, desc } from "drizzle-orm";
import { db } from "../../db";
import { tasks } from "../../db/schema";

export const fetchUserTasks = async (userId: string) => {
  return await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, userId))
    .orderBy(desc(tasks.createdAt));
};

export const createNewTask = async (userId: string, data: any) => {
  const [newTask] = await db
    .insert(tasks)
    .values({
      userId,
      ...data,
    })
    .returning();

  return newTask;
};

export const modifyTask = async (userId: string, taskId: string, data: any) => {
  let completedAt = undefined;

  if (data.completed === true) {
    completedAt = new Date();
  } else if (data.completed === false) {
    completedAt = null;
  }

  const [updated] = await db
    .update(tasks)
    .set({ ...data, completedAt, updatedAt: new Date() })
    .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
    .returning();

  if (!updated) throw new Error("Not found or unauthorized");
  return updated;
};

export const removeTask = async (userId: string, taskId: string) => {
  const [deleted] = await db
    .delete(tasks)
    .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
    .returning();

  if (!deleted) throw new Error("Not found or unauthorized");
  return deleted;
};
