import { Loader2 } from "lucide-react"

const LoadingSpin = () => {
  return (
    <div>
      <h1 className="text-primary">
        <Loader2 className="size-10 animate-spin" />
        <span>Loading...</span>
      </h1>
    </div>
  )
}

export default LoadingSpin
