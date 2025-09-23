import { z } from "zod";
import { documentTypeEnum } from "../../../config/database/schema.ts";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters."),
  email: z.email("Invalid email format."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  role: z.enum(["attendee", "organizer", "admin"]).default("attendee"),
  documentType: z.enum(documentTypeEnum.enumValues).default("CPF"),
  documentNumber: z.string().min(5, "Document number is too short."),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
