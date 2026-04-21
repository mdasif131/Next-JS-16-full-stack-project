import { buttonVariants } from "@/components/ui/button"
import CommentSection from "@/components/web/CommentSection"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { fetchQuery, preloadQuery } from "convex/nextjs"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

interface PostIdRouteProps {
  params: Promise<{
    postId: Id<"posts">
  }>
}

const PostIdRoute = async ({ params }: PostIdRouteProps) => {
  const { postId } = await params
  const [post, preloadedComments] = await Promise.all([
    await fetchQuery(api.posts.getPostBuId, { postId: postId }),
    await preloadQuery(api.comments.getCommentsByPostId, { postId }),
  ])

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link className={buttonVariants({ variant: "ghost" })} href={"/blog"}>
          <ArrowLeft />
          Back to blog
        </Link>
        <h1 className="mt-4 text-2xl font-bold">Post not found</h1>
      </div>
    )
  }
  return (
    <div className="relative mx-auto max-w-3xl px-4 py-8">
      <Link
        className={buttonVariants({
          variant: "outline",
          className: "mb-4 animate-pulse duration-500",
        })}
        href={"/blog"}
      >
        <ArrowLeft />
        Back to blog
      </Link>

      <div className="relative mb-8 h-100 w-full overflow-hidden rounded-xl shadow-sm">
        <Image
          src={post.imageUrl ?? ""}
          alt={post.title ?? "image"}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>
        <p>
          Posted on: {new Date(post._creationTime).toLocaleDateString("en-US")}
        </p>
      </div>
      <hr className="my-8 border border-primary/30" />
      <p className="text-lg leading-relaxed whitespace-pre-wrap text-foreground/90">
        {post.body}
      </p>
      <hr className="my-8 border border-primary/30" />
      <CommentSection preloadedComments={preloadedComments} />
    </div>
  )
}

export default PostIdRoute
