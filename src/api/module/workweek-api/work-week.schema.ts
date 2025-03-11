import { z } from "zod";

const dateSchema = z.string().transform((stringDate) => new Date(stringDate));

export const workWeekSchema = z.object({
  userId: z.string(),
  segunda: z.object({
    start: dateSchema,
    lunchStart: dateSchema,
    lunchEnd: dateSchema,
    end: dateSchema,
  }),
  terca: z.object({
    start: dateSchema,
    lunchStart: dateSchema,
    lunchEnd: dateSchema,
    end: dateSchema,
  }),
  quarta: z.object({
    start: dateSchema,
    lunchStart: dateSchema,
    lunchEnd: dateSchema,
    end: dateSchema,
  }),
  quinta: z.object({
    start: dateSchema,
    lunchStart: dateSchema,
    lunchEnd: dateSchema,
    end: dateSchema,
  }),
  sexta: z.object({
    start: dateSchema,
    lunchStart: dateSchema,
    lunchEnd: dateSchema,
    end: dateSchema,
  }),
  sabado: z.object({
    start: dateSchema,
    lunchStart: dateSchema,
    lunchEnd: dateSchema,
    end: dateSchema,
  }),
  domingo: z
    .object({
      start: dateSchema,
      lunchStart: dateSchema,
      lunchEnd: dateSchema,
      end: dateSchema,
    })
    .optional(),
});
