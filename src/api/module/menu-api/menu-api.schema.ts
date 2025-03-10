import { z } from "zod";

export const menuApiSchema = z.object({
	title: z.string(),
	path: z.string(),
	icon: z.string().optional(),
	order: z.number(),
	rules: z.array(z.string())
});