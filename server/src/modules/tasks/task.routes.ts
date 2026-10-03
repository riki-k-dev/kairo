// server/src/modules/tasks/task.routes.ts

import { Router } from "express";
import * as taskController from "./task.controller";
import { validate } from "../../middleware/validate";
import { createTaskSchema, updateTaskSchema } from "./task.schema";
import { requireAuth } from "../../middleware/auth";

const router = Router();

router.use(requireAuth);

router.get("/", taskController.getTasks);
router.post("/", validate(createTaskSchema), taskController.createTask);
router.patch("/:id", validate(updateTaskSchema), taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
