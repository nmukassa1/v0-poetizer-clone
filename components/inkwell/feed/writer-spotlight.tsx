import { Avatar, Tag } from "@/components/inkwell/primitives"

const spotlight = {
  name: "Eleanor Vance",
  handle: "eleanorv",
  location: "Portland, OR",
  bio: "Editor of The Lantern Review. Writes at the edge of dusk, the seam of the day where memory loosens.",
  pieces: 3,
  followers: "284",
  featured: {
    type: "poem" as const,
    title: "Whispers of Dusk",
    excerpt: "Dawn rose like an eerie mist from an unearthly grave…",
  },
}

export function WriterSpotlight() {
  return (
    <article className="overflow-hidden rounded-xl border border-[var(--ink-border)] bg-[var(--ink-bg)]">
      <div className="flex items-start gap-3.5 px-3.5 pt-3.5 min-[480px]:gap-4 min-[480px]:px-4 min-[480px]:pt-4">
        <Avatar seed={spotlight.name} size={56} />
        <div className="min-w-0 flex-1">
          <p className="font-serif text-base font-semibold leading-tight text-[var(--ink-fg)] min-[480px]:text-[17px]">
            {spotlight.name}
          </p>
          <p className="mt-0.5 text-[11px] text-[var(--ink-subtle)]">
            @{spotlight.handle} · {spotlight.location}
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 cursor-pointer rounded-full border border-[#ddd8ce] bg-transparent px-3 py-1 text-[10px] font-semibold transition-colors hover:border-[var(--ink-fg)] hover:bg-[var(--ink-fg)] hover:text-[var(--ink-bg)] min-[480px]:px-3.5 min-[480px]:py-1.5 min-[480px]:text-[11px]"
        >
          Follow
        </button>
      </div>

      <p className="px-3.5 pt-3 font-serif text-[13px] leading-relaxed text-[var(--ink-muted)] min-[480px]:px-4 min-[480px]:pt-3.5">
        {spotlight.bio}
      </p>

      <div className="m-3.5 mt-3 rounded-lg border border-[var(--ink-border-soft)] bg-white/40 p-3 min-[480px]:m-4 min-[480px]:mt-3.5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Tag label={spotlight.featured.type} />
          <span className="text-[9px] uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
            Featured piece
          </span>
        </div>
        <p className="mb-1 font-serif text-sm font-semibold leading-snug text-[var(--ink-fg)]">
          {spotlight.featured.title}
        </p>
        <p className="font-serif text-[11px] italic leading-relaxed text-[var(--ink-muted)]">
          &ldquo;{spotlight.featured.excerpt}&rdquo;
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[var(--ink-border-soft)] px-3.5 py-2.5 text-[10px] text-[var(--ink-subtle)] min-[480px]:px-4">
        <span>
          <strong className="font-semibold text-[var(--ink-fg)]">{spotlight.pieces}</strong>{" "}
          published
        </span>
        <span>
          <strong className="font-semibold text-[var(--ink-fg)]">{spotlight.followers}</strong>{" "}
          followers
        </span>
        <button
          type="button"
          className="cursor-pointer text-[var(--ink-prompt-meta)] underline-offset-4 hover:underline"
        >
          View profile →
        </button>
      </div>
    </article>
  )
}
