import { users } from "~~/server/database/schema";

export default defineEventHandler(async () => {
  return await db.select().from(users).all();
});
