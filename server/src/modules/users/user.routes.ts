// server/src/modules/users/user.routes.ts

import { Router } from "express";
import * as userController from "./user.controller";
import { validate } from "../../middleware/validate";
import { updateNameSchema } from "./user.schema";
import { requireAuth } from "../../middleware/auth";

const router = Router();

router.use(requireAuth);

router.get("/me", userController.getMe);
router.patch("/me", validate(updateNameSchema), userController.updateMe);
router.delete("/me", userController.deleteMe);

export default router;
