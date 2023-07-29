import { z } from "zod";

export const registerSchema = z.object({
  email: z.string(),
  password: z.string(),
  role: z.enum(["sales", "admin"]),
});

export type RegisterUserInput = z.TypeOf<typeof registerSchema>;
