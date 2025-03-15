import { z } from "zod";

export const workWeekSchema = z.object({
	userId: z.string(),
	title: z.string(),
	dayList: z.array(
		z.object({
			day: z.number(),
			end: z.number(),
			start: z.number(),
			lunchEnd: z.number(),
			lunchStart: z.number()
		})
	)
});
