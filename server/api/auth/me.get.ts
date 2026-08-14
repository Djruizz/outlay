export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, "session");

  if (!sessionId) {
    throw createError({
      statusCode: 401,
      statusMessage: "No autorizado",
    });
  }

  const user = await getUserFromSession(sessionId);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "No autorizado",
    });
  }

  return { user };
});
