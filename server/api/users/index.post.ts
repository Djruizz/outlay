import { users } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = db.insert(users);

  return result;
});
