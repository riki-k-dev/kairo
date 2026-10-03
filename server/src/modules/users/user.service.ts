// server/src/modules/users/user.service.ts

import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export const getUserProfile = async (userId: string) => {
  const data = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId));

  if (!data.length) throw new Error("User vanished?");
  return data[0];
};

export const updateUserName = async (userId: string, name: string) => {
  const [updated] = await db
    .update(users)
    .set({ name, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning({ id: users.id, name: users.name });

  return updated;
};

export const nukeAccount = async (userId: string) => {
  const [deleted] = await db
    .delete(users)
    .where(eq(users.id, userId))
    .returning({ id: users.id });

  return deleted;
};
