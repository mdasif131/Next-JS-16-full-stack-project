import * as z from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

export const postSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(75, "Title must be at most 75 characters")
      .trim(),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters")
      .max(5000, "Content must be at most 5000 characters")
      .trim(),
    image: z
      .instanceof(File)
      .refine((file) => file.size > 0, "Image is required")
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        "Image must be less than 5MB"
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported"
      ),
  })
  .strict()

export type PostFormData = z.infer<typeof postSchema>
