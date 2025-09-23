import { z } from "zod";
import type { User } from "../../../shared/types/users/user.types.ts";

export const paginationQuerySchema = z.object({
  page: z.string().optional().default("1").transform(Number),
  limit: z.string().optional().default("10").transform(Number),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export type PaginatedUsers = {
  data: Omit<User, "passwordHash">[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
