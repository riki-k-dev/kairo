// server/src/server.ts

import app from "./app";
import { env } from "./config/env";

const p1 = env.PORT || 5000;

const startServer = () => {
  try {
    app.listen(p1, () => {
      console.log(`Server is running on http://localhost:${p1}`);
      // console.log(`Client URL allowed: ${env.CLIENT_URL}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();
