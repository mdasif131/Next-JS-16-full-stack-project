"use client"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="h-full py-20 flex flex-col items-center justify-center">
      <p className="text-red-400">Something went wrong</p>
      <p>{error?.message || "Unexpected error occurred"}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
