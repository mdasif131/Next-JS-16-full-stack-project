import Link from "next/link"
import { ThemeToggle } from "../theme-toggle"
import { buttonVariants } from "../ui/button"

export function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between py-5">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold">
            X-<span className="text-blue-500">Deals</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link className={buttonVariants({variant:"ghost"})} href="/">Home</Link>
          <Link className={buttonVariants({variant:"ghost"})} href="/blog">Blog</Link>
          <Link className={buttonVariants({variant:"ghost"})} href="/create">Create</Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link className={buttonVariants()} href="/auth/sign-up">Sign up</Link>
        <Link className={buttonVariants({variant:"outline"})} href="/auth/login">Login</Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}
