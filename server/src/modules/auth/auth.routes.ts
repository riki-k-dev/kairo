// server/src/modules/auth/auth.routes.ts

import { Router } from "express";
import * as authController from "./auth.controller";
import { validate } from "../../middleware/validate";
import { authLimiter } from "../../middleware/rateLimit";
import { signupSchema, signinSchema } from "./auth.schema";

const router = Router();

router.post(
  "/signup",
  authLimiter,
  validate(signupSchema),
  authController.signup,
);
router.post(
  "/signin",
  authLimiter,
  validate(signinSchema),
  authController.signin,
);

export default router;
