import {z} from "zod";

const reportSchema = z.object({
    date: z.date(),
    observation: z.string().optional(),
});

export const workReportSchema = z.object({
    userId: z.string(),
    startWork: reportSchema,
    endWork: reportSchema,
    startLunch: reportSchema,
    endLunch: reportSchema,
  });