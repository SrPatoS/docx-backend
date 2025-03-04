import { z } from "zod";

export const companyApiSchema = z.object({
    avatar: z.string().optional(),
    name: z.string(),
    cnpj: z.string().min(18),
});