import { buttonVariants } from "@/components/ui/button"
import CommentSection from "@/components/web/CommentSection"
import PostPresence from "@/components/web/PostPresence"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { getToken } from "@/lib/auth-server"
import { fetchQuery, preloadQuery } from "convex/nextjs"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

interface PostIdRouteProps {
  params: Promise<{
    postId: Id<"posts">
  }>
}
export async function generateMetadata({
  params,
}: PostIdRouteProps): Promise<Metadata> {
  const { postId } = await params
  const post = await fetchQuery(api.posts.getPostBuId, { postId: postId })
  if (!post) {
    return {
      title: "Post not found",
    }
  }
  return {
    title: post.title,
    description: post.body,
    authors: [{ name: "MD ASIF CHOWDHURY" }],
  }
}
const PostIdRoute = async ({ params }: PostIdRouteProps) => {
  
  const { postId } = await params
  const token = await getToken()
  const [post, preloadedComments, userId] = await Promise.all([
    await fetchQuery(api.posts.getPostBuId, { postId: postId }),
    await preloadQuery(api.comments.getCommentsByPostId, { postId }),
    await fetchQuery(api.presence.getUserId, {}, { token }),
  ])
  if (!userId) {
    return redirect("/auth/login")
  }
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

      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm">
        <Image
          src={
            post.imageUrl ??
            "https://images.unsplash.com/photo-1601138412895-73ebdb2bd981?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExNHx8fGVufDB8fHx8fA%3D%3D%22"
          }
          alt={post.title ?? "Best Tech Deals Under $100 Right Now"}
          fill
          className="object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>
        <div className="flex items-center gap-2">
          <p>
            Posted on:{" "}
            {new Date(post._creationTime).toLocaleDateString("en-US")}
          </p>
          {userId && <PostPresence roomId={post._id} userId={userId} />}
        </div>
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
