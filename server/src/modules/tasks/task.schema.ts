// server/src/modules/tasks/task.schema.ts

import { z } from "zod";

export const createTaskSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title missing"),
        description: z.string().optional(),
        color: z.string().default("yellow"),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
    }),
});

export const updateTaskSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        completed: z.boolean().optional(),
        color: z.string().optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
    }),
});
