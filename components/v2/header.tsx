import Link from "next/link"
import { Search, PenLine, User } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border/80 bg-card/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/v2" className="group shrink-0">
          <span className="block font-[family-name:var(--font-v2-serif)] text-2xl font-bold tracking-tight text-foreground">
            inkwell
          </span>
          <span className="mt-0.5 block text-[11px] tracking-wide text-muted-foreground group-hover:text-accent transition-colors">
            a home for your words
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Discover
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Writers
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="hidden h-9 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity sm:inline-flex"
          >
            <PenLine className="h-3.5 w-3.5" strokeWidth={2} />
            Write
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-accent/40 hover:text-accent transition-colors"
            aria-label="Search"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-accent/40 hover:text-foreground transition-colors"
            aria-label="Profile"
          >
            <User className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  )
}
