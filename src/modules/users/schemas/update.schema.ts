import { z } from "zod";
import { documentTypeEnum } from "../../../config/database/schema.ts";

export const updateUserSchema = z
  .object({
    name: z.string().min(2, "Name must have at least 2 characters.").optional(),
    email: z.email("Invalid email format.").optional(),
    documentType: z.enum(documentTypeEnum.enumValues).default("CPF").optional(),
    documentNumber: z
      .string()
      .min(5, "Document number is too short.")
      .optional(),
  })
  .strict();

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
