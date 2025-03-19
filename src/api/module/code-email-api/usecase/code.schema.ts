import z from "zod";

export const codeEmailSchema = z.object({
    email: z.string().email()
});