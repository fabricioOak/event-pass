import { z } from "zod";

export const userParamsSchema = z.object({
  id: z.uuid(),
});
