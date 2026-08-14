import crypto from "node:crypto";
import { sessions } from "../database/schema";

export function generateSessionId() {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(userId: number) {
  const sessionId = generateSessionId();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  });

  return {
    id: sessionId,
    expiresAt,
  };
}
