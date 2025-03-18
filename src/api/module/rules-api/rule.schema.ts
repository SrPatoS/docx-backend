import z from "zod";

export const ruleSchema = z.object({
    name: z.string(),
    description: z.string(),
    tag: z.string(),
    uniqueCode: z.string().min(1)
});