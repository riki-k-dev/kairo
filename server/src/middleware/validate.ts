// server/src/middleware/validate.ts

import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

// Centralized validation middleware
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errMessages = error.issues.map(
          (e) => `${e.path.join(".")}: ${e.message}`,
        );

        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errMessages,
        });
      } else {
        next(error);
      }
    }
  };
};
