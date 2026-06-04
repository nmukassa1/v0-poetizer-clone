import type { PiecePost } from "@/lib/feed-data"
import { getProfileHrefByHandle } from "@/lib/profiles"
import { PieceCard } from "@/components/inkwell/piece-card"

export function MoreFromAuthor({
  authorFirstName,
  pieces,
}: {
  authorFirstName: string
  pieces: PiecePost[]
}) {
  return (
    <section className="mx-auto max-w-[640px] px-5 min-[480px]:px-6 lg:max-w-[680px]">
      <div className="my-7 flex items-center gap-2.5">
        <div className="h-px flex-1 bg-[var(--ink-border)]" />
        <span className="font-serif text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
          More from {authorFirstName}
        </span>
        <div className="h-px flex-1 bg-[var(--ink-border)]" />
      </div>
      {pieces.map((p) => (
        <PieceCard
          key={p.id}
          post={p}
          readHref={`/read/${p.id}`}
          authorHref={getProfileHrefByHandle(p.authorHandle)}
        />
      ))}
    </section>
  )
}
