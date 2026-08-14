import { users } from "~~/server/database/schema";
import { eq } from "drizzle-orm";
import {
  registerSchema,
  type RegisterSchema,
} from "@@/shared/schemas/auth/register";

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, "session");

  if (sessionId) {
    const user = await getUserFromSession(sessionId);

    if (user) {
      throw createError({
        statusCode: 400,
        statusMessage: "Ya tienes una sesión activa",
      });
    }
  }
  const body: RegisterSchema = await readBody(event);
  const result = registerSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos inválidos",
    });
  }

  const { name, email, password } = result.data;

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1);
  if (existingUser.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No se puede registrar la cuenta",
    });
  }

  const passwordHash = await hashPassword(password);

  const [createdUser] = await db
    .insert(users)
    .values({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      createdAt: users.createdAt,
    });

  return { user: createdUser };
});
