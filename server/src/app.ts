// server/src/app.ts

import express from "express";
import cors from "cors";
import { env } from "./config/env";
import authRoutes from "./modules/auth/auth.routes";
import { errorHandler } from "./middleware/error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.get("/health", (_req, res) => {
  // let t1 = Date.now();
  res.status(200).json({ status: "ok", message: "Kairo server running!" });
});

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
