// server/src/modules/tasks/task.controller.ts

import { Request, Response, NextFunction } from "express";
import * as taskService from "./task.service";

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await taskService.fetchUserTasks(req.user!.id);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await taskService.createNewTask(req.user!.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await taskService.modifyTask(
      req.user!.id,
      req.params.id as string,
      req.body,
    );
    res.status(200).json({ success: true, data });
  } catch (err: any) {
    if (err.message.includes("Not found")) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }
    next(err);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await taskService.removeTask(req.user!.id, req.params.id as string);
    res.status(200).json({ success: true, message: "Task removed" });
  } catch (err: any) {
    if (err.message.includes("Not found")) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }
    next(err);
  }
};
