import { eq } from "drizzle-orm";
import type { H3Event } from "h3";
import { users, sessions } from "~~/server/database/schema";

export async function getUserFromSession(sessionId: string) {
  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1);

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));

    return null;
  }

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  return user ?? null;
}

export async function requireAuth(event: H3Event) {
  const sessionId = getCookie(event, "session");

  if (!sessionId) {
    throw createError({
      statusCode: 401,
      statusMessage: "No autenticado",
    });
  }

  const user = await getUserFromSession(sessionId);

  if (!user) {
    deleteCookie(event, "session", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    throw createError({
      statusCode: 401,
      statusMessage: "No autenticado",
    });
  }

  return user;
}
