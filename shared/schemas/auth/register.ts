import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    email: z.email("Invalid email"),
    password: z
      .string("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string("Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.output<typeof registerSchema>;

