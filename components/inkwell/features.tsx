import type { ContentTag } from "@/lib/feed-data"
import { lovedPieces, quoteOfDay, trendingWriters } from "@/lib/feed-data"
import { Avatar, HeartIcon, Tag } from "@/components/inkwell/primitives"

const lovedAccents: Record<
  ContentTag,
  { bg: string; border: string; title: string; meta: string }
> = {
  poem: { bg: "#EEEDFE", border: "#CCC9F4", title: "#26215C", meta: "#7F77DD" },
  story: { bg: "#FAEEDA", border: "#F5CC88", title: "#3a1f02", meta: "#A06318" },
  essay: { bg: "#E1F5EE", border: "#8FD9BC", title: "#04342C", meta: "#0F6E56" },
}

export function TrendingWriters() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--ink-border)] bg-[var(--ink-bg)]">
      {trendingWriters.map((w, i) => (
        <div
          key={w.handle}
          className={`flex items-center gap-2.5 px-3.5 py-3 min-[480px]:gap-3.5 min-[480px]:px-4 min-[480px]:py-3.5 ${
            i < trendingWriters.length - 1 ? "border-b border-[var(--ink-border-soft)]" : ""
          }`}
        >
          <span className="max-[479px]:inline min-[480px]:hidden">
            <Avatar seed={w.name} size={30} />
          </span>
          <span className="hidden min-[480px]:inline">
            <Avatar seed={w.name} size={36} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold min-[480px]:text-[13px]">{w.name}</div>
            <div className="mt-0.5 hidden text-[11px] text-[#a09c94] min-[480px]:block">{w.bio}</div>
          </div>
          <div className="shrink-0 text-right max-[479px]:mr-1.5 min-[480px]:mr-3">
            <div className="text-xs font-semibold">{w.followers}</div>
            <div className="text-[9px] uppercase tracking-[0.08em] text-[var(--ink-subtle)]">followers</div>
          </div>
          <button
            type="button"
            className="shrink-0 cursor-pointer rounded-full border border-[#ddd8ce] bg-transparent px-2.5 py-1 text-[10px] font-semibold min-[480px]:px-3 min-[480px]:py-1.5 min-[480px]:text-[11px]"
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  )
}

export function ReadersLovingGrid({ variant = "feed" }: { variant?: "feed" | "sidebar" }) {
  if (variant === "sidebar") {
    return (
      <div className="flex flex-col gap-3">
        {lovedPieces.map((p) => {
          const c = lovedAccents[p.type]
          return (
            <div
              key={p.title}
              className="cursor-pointer rounded-[10px] border p-4"
              style={{ background: c.bg, borderColor: c.border }}
            >
              <Tag label={p.type} />
              <div
                className="my-2 font-serif text-sm font-bold leading-snug"
                style={{ color: c.title }}
              >
                {p.title}
              </div>
              <div
                className="mb-3 line-clamp-2 font-serif text-xs leading-relaxed"
                style={{ color: c.meta }}
              >
                {p.excerpt}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar seed={p.author} size={20} />
                  <span className="text-xs" style={{ color: c.meta }}>
                    {p.author.split(" ")[0]}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-xs" style={{ color: c.meta }}>
                  <HeartIcon /> {p.likes}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 min-[480px]:gap-2.5">
        {lovedPieces.map((p, i) => {
          const c = lovedAccents[p.type]
          return (
            <div
              key={p.title}
              className={`cursor-pointer rounded-[10px] border p-3 min-[480px]:p-[13px] ${
                i >= 2 ? "hidden min-[480px]:block" : ""
              }`}
              style={{ background: c.bg, borderColor: c.border }}
            >
              <Tag label={p.type} />
              <div
                className="my-1.5 font-serif text-xs font-bold leading-snug min-[480px]:my-[7px] min-[480px]:text-[13px]"
                style={{ color: c.title }}
              >
                {p.title}
              </div>
              <div
                className="mb-2.5 hidden font-serif text-[11px] leading-relaxed min-[480px]:block"
                style={{ color: c.meta }}
              >
                {p.excerpt}
              </div>
              <div className="mt-2 flex items-center justify-between min-[480px]:mt-0">
                <div className="flex items-center gap-1.5">
                  <Avatar seed={p.author} size={16} />
                  <span className="text-[10px]" style={{ color: c.meta }}>
                    {p.author.split(" ")[0]}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[10px]" style={{ color: c.meta }}>
                  <HeartIcon /> {p.likes}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function QuoteCallout() {
  return (
    <blockquote className="my-1 border-l-[3px] border-[var(--ink-fg)] py-0 pl-[18px]">
      <p className="mb-2.5 font-serif text-[15px] font-semibold italic leading-snug text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[1.55]">
        &ldquo;{quoteOfDay.text}&rdquo;
      </p>
      <cite className="text-[11px] not-italic tracking-wide text-[#a09c94]">
        — {quoteOfDay.author}
      </cite>
    </blockquote>
  )
}
