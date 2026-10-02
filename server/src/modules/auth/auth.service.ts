// server/src/modules/auth/auth.service.ts

import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";

// Handle user registration logic
export const registerUser = async (data: any) => {
  // check if email already exists
  const existingEmail = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  if (existingEmail.length > 0) {
    throw new Error("Email already in use");
  }

  // hash pass using bcrypt
  const hashedPass = await hashPassword(data.password);

  // save user to db
  const [newUser] = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      passwordHash: hashedPass,
    })
    .returning();

  // generate jwt token
  const token = generateToken(newUser.id);

  return {
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
    token,
  };
};

// Handle user login logic
export const loginUser = async (data: any) => {
  // get user by email
  const u1 = await db.select().from(users).where(eq(users.email, data.email));

  if (u1.length === 0) {
    throw new Error("Invalid email or password");
  }

  const dbUser = u1[0];

  // verify matched password
  const isMatch = await comparePassword(data.password, dbUser.passwordHash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // create auth token
  const token = generateToken(dbUser.id);

  return {
    user: { id: dbUser.id, name: dbUser.name, email: dbUser.email },
    token,
  };
};
