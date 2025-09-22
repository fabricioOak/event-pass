import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env.ts";
if (!env.DATABASE_URL) {
  throw new Error("The DATABASE_URL env is required.");
}

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: "./src/config/database/migrations",
  schema: "./src/config/database/schema.ts",
  casing: "snake_case",
});
