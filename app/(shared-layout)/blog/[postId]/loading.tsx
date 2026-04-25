import { Skeleton } from "@/components/ui/skeleton"

const PostIdLoading = () => {
  return (
    <div className="relative mx-auto max-w-3xl px-4 py-8">
      {/* Back button */}
      <Skeleton className="mb-4 h-9 w-36 rounded-md" />

      {/* Hero image */}
      <Skeleton className="relative mb-8 h-100 w-full rounded-xl" />

      {/* Title + meta */}
      <div className="flex flex-col space-y-4">
        {/* Title — two lines to mimic long headings */}
        <Skeleton className="h-10 w-3/4 rounded-md" />
        <Skeleton className="h-6 w-1/2 rounded-md" />

        {/* Posted-on + presence avatars */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-40 rounded-md" />
          {/* Presence dots */}
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border " />

      {/* Post body — multiple paragraph lines */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-[95%] rounded-md" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-[90%] rounded-md" />
        <Skeleton className="h-5 w-[85%] rounded-md" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-[92%] rounded-md" />
        <Skeleton className="h-5 w-3/4 rounded-md" />
      </div>

      {/* Divider */}
      <hr className="my-8  " />

      {/* Comment section */}
      <div className="space-y-6">
        {/* Section heading */}
        <Skeleton className="h-7 w-40 rounded-md" />

        {/* Comment input area */}
        <div className="space-y-2">
          <Skeleton className="h-24 w-full rounded-md" />
          <div className="flex justify-end">
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
        </div>

        {/* Existing comments */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            {/* Avatar */}
            <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              {/* Author + timestamp */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
              {/* Comment body */}
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-[80%] rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostIdLoading
