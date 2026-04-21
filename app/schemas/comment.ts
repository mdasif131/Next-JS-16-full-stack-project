import { Id } from "@/convex/_generated/dataModel";
import z from "zod";

export const commentSchema = z.object({
  body: z.string().min(2).max(150),
  postId: z.string().transform((val) => val as Id<"posts">),
})
