import * as z from "zod"

export const postSchema = z
  .object({
    title: z
      .string()
      .min(3)
      .max(75, "Title must be at most 75 characters")
      .trim(),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters")
      .max(5000, "Content must be at most 5000 characters")
      .trim(),
    image: z.instanceof(File)
  })
  .strict()