// server/src/modules/auth/auth.schema.ts

import { z } from "zod";

// Signup validation schema
export const signupSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

// Signin validation schema
export const signinSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address format"),
    password: z.string().min(1, "Password is required"),
  }),
});
