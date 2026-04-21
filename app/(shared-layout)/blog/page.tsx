import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
export const dynamic = "force-static"
export const revalidate = 30

export const metadata: Metadata = {
  title: "X-deals Blog",
  description: "Insights, thoughts, and trends form our team.",
  category: "E-commerce blog",
  authors: [{ name: "MD ASIF CHOWDHURY" }],
}
const BlogPage = () => {
  return (
    <div className="p-12">
      <div className="pb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="mx-auto max-w-2xl pt-4 text-xl text-muted-foreground">
          Insights, thoughts, and trends form our team.
        </p>
      </div>
      <Suspense fallback={<SkeletonLoading />}>
        <LoadBlogPage />
      </Suspense>
    </div>
  )
}

export default BlogPage

const LoadBlogPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const data = await fetchQuery(api.posts.getPosts)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post) => (
        <Card key={post._id} className="pt-0 shadow-xl drop-shadow-fuchsia-300">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={
                post.imageUrl ??
                "https://images.unsplash.com/photo-1601138412895-73ebdb2bd981?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExNHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="blog_image"
              fill
              className="rounded-t-lg object-cover"
            />
          </div>
          <CardContent>
            <Link href={`/blog/${post._id}`}>
              <h1 className="text-2xl font-bold hover:text-primary">
                {post.title}
              </h1>
              <p className="line-clamp-3 text-muted-foreground">{post.body}</p>
            </Link>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({ className: "w-full" })}
              href={`/blog/${post._id}`}
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
const SkeletonLoading = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-48 w-full rounded-t-lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
