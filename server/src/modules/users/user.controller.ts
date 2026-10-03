// server/src/modules/users/user.controller.ts

import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await userService.getUserProfile(req.user!.id);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await userService.updateUserName(req.user!.id, req.body.name);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const deleteMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await userService.nukeAccount(req.user!.id);
    res
      .status(200)
      .json({ success: true, message: "Account permanently deleted" });
  } catch (err) {
    next(err);
  }
};
