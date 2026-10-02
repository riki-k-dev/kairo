// server/src/middleware/auth.ts

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

// Type safety for req.user
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

// Middleware to protect routes
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ success: false, message: "Authentication required" });
      return;
    }

    const token = authHeader.split(" ")[1];

    // console.log("token aagaya:", token);

    const decoded = verifyToken(token);

    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
    return;
  }
};
