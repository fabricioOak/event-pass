import { z } from "zod";
import { userStatusEnum } from "../../../config/database/schema.ts";

export const updateStatusSchema = z.object({
  status: userStatusEnum.enumValues,
});
