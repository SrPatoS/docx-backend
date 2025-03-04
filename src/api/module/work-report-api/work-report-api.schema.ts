import {z} from "zod";

const reportSchema = z.object({
    date: z.date(),
    observation: z.string().optional(),
});

export const workReportSchema = z.object({
    userName: z.string().optional(),
    userId: z.string(),
    companyId: z.string(),
    companyName: z.string().optional(),
    startWork: reportSchema,
    endWork: reportSchema,
    startLunch: reportSchema,
    endLunch: reportSchema,
  });