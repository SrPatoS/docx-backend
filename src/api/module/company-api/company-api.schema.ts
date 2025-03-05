import { z } from "zod";

const userApiSchema = z.array(z.object({
    name: z.string(),
    _id: z.string(),
}));

export const companyApiSchema = z.object({
<<<<<<< HEAD
    avatar: z.string().optional(),
    name: z.string(),
    cnpj: z.string().min(18),
    users: userApiSchema.optional()
=======
	avatar: z.string().optional(),
	name: z.string(),
	cnpj: z.string().min(18),
	uniqueCode: z.string().min(1)
>>>>>>> main
});