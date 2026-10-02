// server/src/modules/auth/auth.controller.ts

import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";

// Request handler for signup
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // console.log("Signup data received:", req.body);
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Email already in use") {
      res.status(409).json({ success: false, message: error.message });
      return;
    }
    next(error);
  }
};

// Request handler for signin
export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Invalid email or password") {
      res.status(401).json({ success: false, message: error.message });
      return;
    }
    next(error);
  }
};
