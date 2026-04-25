"use client"
import { Loader2, Search } from "lucide-react"
import { Input } from "../ui/input"
import { useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"

const SearchInput = () => {
  const [term, setTerm] = useState("")
  const [open, setOpen] = useState(false)
  const results = useQuery(
    api.posts.searchPosts,
    term.length >= 2 ? { limit: 5, trem: term } : "skip"
  )
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value)
    setOpen(true)
  }
  return (
    <div className="relative z-10 w-full max-w-sm">
      <div className="relative">
        <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search Posts...."
          className="w-full bg-background pl-8"
          value={term}
          onChange={handleInputChange}
        />
      </div>
      {open && term.length >= 2 && (
        <>
          <div className="absolute top-full mt-2 animate-in rounded-md border bg-popover p-2 text-popover-foreground shadow-md fade-in-0 outline-none zoom-in-95">
            {results === undefined ? (
              <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                <Loader2 className="mr-2 size-4 animate-spin" /> Searching...
              </div>
            ) : results.length === 0 ? (
              <p className="p-4 text-center text-muted-foreground">
                No results found!
              </p>
            ) : (
              <div className="py-1">
                {results.map((post) => (
                  <Link
                    href={`/blog/${post._id}`}
                    key={post._id}
                    onClick={() => {
                      setOpen(false);
                      setTerm("")
                    }}
                    className="flex flex-col px-4 py-2 text-sm hover:cursor-pointer! hover:bg-accent hover:text-accent-foreground"
                  >
                    <p className="truncate font-medium">{post.title}</p>
                    <p className="pt-1 text-xs text-muted-foreground">{`${post.body.substring(0, 60)}...`}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchInput
