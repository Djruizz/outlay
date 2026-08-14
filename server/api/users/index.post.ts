import { users } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = db
    .insert(users)
    .values({ name: body.name, email: body.email });

  return result;
});
