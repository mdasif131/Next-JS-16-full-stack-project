import * as z from "zod"

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),

    email: z.string().email("Please enter a valid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be at most 30 characters"),
  })
  .strict()
export const loginSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be at most 30 characters"),
  })
  .strict()