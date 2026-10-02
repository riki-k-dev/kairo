// server/src/config/env.ts

import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// Define environment schema
const envSchema = z.object({
  PORT: z.string().default("5000"),
  DATABASE_URL: z.string().min(1, "Database URL missing"),
  JWT_SECRET: z.string().min(1, "JWT Secret missing"),
  CLIENT_URL: z.string().min(1, "Client URL missing"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

// console.log("env variables loaded successfully!");

export const env = parsedEnv.data;
