import type { users } from "../../../config/database/schema.ts";
import type { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;

// For JWT
export type UserPayload = {
  id: string;
  email: string;
  name: string;
  role: string;
};
