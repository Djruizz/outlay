import { eq } from "drizzle-orm";
import { sessions } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, "session");

  if (sessionId) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  }

  deleteCookie(event, "session", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return {
    success: true,
  };
});
