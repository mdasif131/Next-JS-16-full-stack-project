"use client"
import createBlogAction from "@/app/actions"
import { postSchema } from "@/app/schemas/blog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

const CreatePage = () => {
  const [isPending, startTransition] = useTransition()
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  })

  const onSubmit = (values: z.infer<typeof postSchema>) => {
    startTransition(async () => {
      await createBlogAction(values)
    })
  }
  return (
    <div className="py-12">
      <div className="pb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="pt-4 text-xl text-muted-foreground">
          Share your thoughts with the big world
        </p>
      </div>

      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <CardTitle>Create your own blog article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4">
          <FieldGroup className="space-y-3">
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Image Upload</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="write your blog title"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      field.onChange(file)
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="write your blog title"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    aria-invalid={fieldState.invalid}
                    placeholder="write your description"
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
                <span>Create Post</span>
              )}
            </Button>
          </FieldGroup>
        </form>
      </Card>
    </div>
  )
}

export default CreatePage
