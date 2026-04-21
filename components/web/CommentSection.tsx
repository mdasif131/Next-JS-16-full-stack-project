"use client"
import { commentSchema } from "@/app/schemas/comment"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { zodResolver } from "@hookform/resolvers/zod"
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react"
import { Loader2, MessagesSquare } from "lucide-react"
import { useParams } from "next/navigation"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"


const CommentSection = (props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>
}) => {
  const [isPending, startTransition] = useTransition()
  const params = useParams()
  const postId = params.postId as Id<"posts">
  const createComment = useMutation(api.comments.createComment)
  const data = usePreloadedQuery(props.preloadedComments);

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: postId,
    },
  })
  const onSubmit = (data: z.infer<typeof commentSchema>) => {
    startTransition(async () => {
      try {
        await createComment(data)
        toast.success("Comment created successfully")
        form.reset()
      } catch {
        toast.error("Failed to create comment")
      }
    })
  }
  if (data === undefined) {
    return <p>Loading....</p>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessagesSquare className="size-5" />
        <h2 className="text-xl font-bold">{data.length} Comments</h2>
      </CardHeader>

      <CardContent className="space-y-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Share you opinion</FieldLabel>
                <Textarea
                  aria-invalid={fieldState.invalid}
                  placeholder="Share your thoughts"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Comment</span>
            )}
          </Button>
        </form>
        <section className="space-y-6">
          {data?.map((comment) => {
            const avatarName =
              comment.authorName.slice(0, 2).toUpperCase() ?? "Unknown"
            const comentDate = new Date(
              comment._creationTime
            ).toLocaleDateString("en-US")
            return (
              <div key={comment._id} className="flex items-center space-x-4">
                <Avatar className="size-10 shrink-0">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/rauchg.svg?text=${avatarName}`}
                    alt={avatarName ?? "avatar"}
                  />
                  <AvatarFallback>{avatarName}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold">
                      {comment.authorName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {comentDate}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
                    {comment.body}
                  </p>
                </div>
              </div>
            )
          })}
        </section>
      </CardContent>
    </Card>
  )
}

export default CommentSection
