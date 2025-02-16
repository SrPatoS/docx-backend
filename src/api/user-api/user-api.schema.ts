import { z } from "zod";

export const userApiSchema = z.object({
  name: z.string().min(5),
  email: z.string().min(5).email(),
  password: z.string().min(8),
  rule: z.string().min(5),
});