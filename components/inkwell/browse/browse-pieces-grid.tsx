import Link from "next/link"
import type { PiecePost } from "@/lib/feed/types"
import { getProfileHrefByHandle } from "@/lib/profile"
import { BrowsePieceCard } from "./browse-piece-card"

export function BrowsePiecesGrid({ pieces }: { pieces: PiecePost[] }) {
  return (
    <section className="pb-4">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-xl font-semibold text-[var(--ink-fg)] min-[480px]:text-2xl">
          All pieces
        </h2>
        <span className="font-sans text-[11px] tabular-nums text-[var(--ink-subtle)]">
          {pieces.length} {pieces.length === 1 ? "piece" : "pieces"}
        </span>
      </div>

      {pieces.length === 0 ? (
        <p className="py-16 text-center font-serif text-[15px] text-[var(--ink-muted)]">
          No pieces in this category yet.{" "}
          <Link
            href="/write"
            className="font-semibold text-[var(--ink-fg)] underline-offset-2 hover:underline"
          >
            Write the first one
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[640px]:gap-5 lg:gap-6">
          {pieces.map((piece) => (
            <BrowsePieceCard
              key={piece.id}
              post={piece}
              readHref={`/read/${piece.id}`}
              authorHref={getProfileHrefByHandle(piece.authorHandle)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
