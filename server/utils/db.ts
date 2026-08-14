import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../database/schema";

const sqlite = new Database("server/database/data.db");
sqlite.pragma("journal_mode = WAL"); // recomendado, mejora performance

export const db = drizzle(sqlite, { schema });
