import { z } from "zod";

export const workReportSchema = z.object({
	status: z.string(),
	observation: z.string().optional()
});