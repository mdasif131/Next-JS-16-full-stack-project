"use client"
import Link from "next/link"
import { ThemeToggle } from "../theme-toggle"
import { Button, buttonVariants } from "../ui/button"
import { useConvexAuth } from "convex/react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function Navbar() {
  const router = useRouter();
  const {isAuthenticated, isLoading} = useConvexAuth();
  return (
    <nav className="flex w-full items-center justify-between py-5">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            X-<span className="text-primary">Deals</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link className={buttonVariants({ variant: "ghost" })} href="/">
            Home
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/blog">
            Blog
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/create">
            Create
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isLoading ? null : isAuthenticated ? (
          <Button onClick={() => authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                toast.success("Logged out successfully")
                router.push("/")
              },
              onError: (err) => {
                toast.error(err.error.message || "Failed to log out")
              }
            }
          })}>Logout</Button>
        ) : (
          <>
            <Link className={buttonVariants()} href="/auth/sign-up">
              Sign up
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/auth/login"
            >
              Login
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  )
}
