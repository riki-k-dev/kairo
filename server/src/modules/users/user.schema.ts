// server/src/modules/users/user.schema.ts

import { z } from "zod";

export const updateNameSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name needs to be at least 2 chars"),
  }),
});
