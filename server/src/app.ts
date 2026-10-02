// server/src/app.ts

import express from "express";
import cors from "cors";
import { env } from "./config/env";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.get("/health", (req, res) => {
  // let t1 = Date.now();
  res
    .status(200)
    .json({ status: "ok", message: "Kairo server running!" });
});

export default app;
