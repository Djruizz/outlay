import { eq } from "drizzle-orm";
import { users } from "~~/server/database/schema";
import { verifyPassword } from "~~/server/utils/password";
import { createSession } from "~~/server/utils/sessions";
import { type LoginSchema, loginSchema } from "~~/shared/schemas/auth/login";

export default defineEventHandler(async (event) => {
  const body: LoginSchema = await readBody(event);
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos inválidos",
    });
  }

  const { email, password } = result.data;

  const normalizedEmail = email.toLowerCase().trim();

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Credenciales inválidas",
    });
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Credenciales inválidas",
    });
  }

  const session = await createSession(user.id);

  setCookie(event, "session", session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: session.expiresAt,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
});
