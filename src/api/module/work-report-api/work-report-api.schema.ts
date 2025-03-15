import { z } from "zod";

export const workReportSchema = z.object({
	status: z.string(),
	observation: z.string().optional(),
	date: z.string().refine(value => !isNaN(Date.parse(value)), {
		message: "Invalid date format"
	})
});