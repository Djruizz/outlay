import z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string("Password is required"),
});
export type LoginSchema = z.output<typeof loginSchema>;
