import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-tight sm:text-base">
            神奇的奇 AI Lab
          </span>
        </Link>

        <Button
          render={
            <a
              href="https://0xvyy314ny.youware.app"
              target="_blank"
              rel="noopener noreferrer"
            />
          }
          size="lg"
          className="glow-primary"
        >
          AI简历
        </Button>
      </div>
    </header>
  )
}
