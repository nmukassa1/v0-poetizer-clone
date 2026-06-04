import Link from "next/link"
import { PenSquare } from "lucide-react"

export function ProfileWriteFab() {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-20 lg:hidden">
      <Link
        href="/write"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[var(--ink-fg)] px-4 py-2.5 text-xs font-semibold tracking-wide text-[var(--ink-bg)] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
      >
        <PenSquare className="h-4 w-4" />
        New piece
      </Link>
    </div>
  )
}
