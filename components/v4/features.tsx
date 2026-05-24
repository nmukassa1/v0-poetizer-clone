import type { ContentTag } from "@/lib/v4-feed-data"
import {
  v4LovedPieces,
  v4QuoteOfDay,
  v4TrendingWriters,
} from "@/lib/v4-feed-data"
import { Avatar, HeartIcon, Tag } from "@/components/v4/primitives"

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
    <div className="rounded-xl bg-[#f5f3ee] p-5 sm:p-6 lg:p-8">
      <div className="mb-4 font-sans text-[11px] font-bold tracking-[0.1em] text-[var(--v4-subtle)] sm:mb-5 sm:text-xs">
        TRENDING WRITERS
      </div>
      <div className="flex flex-col">
        {v4TrendingWriters.map((w, i) => (
          <div
            key={w.handle}
            className={`flex flex-col gap-3 py-2.5 sm:flex-row sm:items-center sm:gap-3 sm:py-2.5 ${
              i < v4TrendingWriters.length - 1
                ? "border-b border-[var(--v4-border)]"
                : ""
            }`}
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <Avatar seed={w.name} size={48} />
              <div className="min-w-0">
                <div className="text-base font-semibold sm:text-lg">{w.name}</div>
                <div className="mt-1 text-sm text-[#a09c94]">{w.bio}</div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <div className="text-left sm:text-right">
                <div className="text-sm font-semibold sm:text-base">{w.followers}</div>
                <div className="text-xs text-[var(--v4-subtle)] sm:text-sm">followers</div>
              </div>
              <button
                type="button"
                className="shrink-0 cursor-pointer rounded-full border border-[#d8d4cc] bg-white px-4 py-2 text-sm font-semibold sm:px-5 sm:py-2.5"
              >
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReadersLovingGrid() {
  return (
    <div>
      <div className="mb-4 font-sans text-[11px] font-bold tracking-[0.1em] text-[var(--v4-subtle)] sm:mb-5 sm:text-xs">
        READERS ARE LOVING
      </div>
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
        {v4LovedPieces.map((p) => {
          const c = lovedAccents[p.type]
          return (
            <div
              key={p.title}
              className="cursor-pointer rounded-xl border p-4 sm:p-5 lg:p-6"
              style={{ background: c.bg, borderColor: c.border }}
            >
              <Tag label={p.type} />
              <div
                className="my-2 font-serif text-base font-bold leading-snug sm:my-3 sm:text-lg"
                style={{ color: c.title }}
              >
                {p.title}
              </div>
              <div
                className="mb-3 line-clamp-3 font-serif text-sm leading-relaxed sm:text-base"
                style={{ color: c.meta }}
              >
                {p.excerpt}
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <Avatar seed={p.author} size={24} />
                  <span
                    className="truncate text-xs sm:text-sm"
                    style={{ color: c.meta }}
                  >
                    {p.author.split(" ")[0]}
                  </span>
                </div>
                <span
                  className="flex shrink-0 items-center gap-1 text-xs sm:text-sm"
                  style={{ color: c.meta }}
                >
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
    <blockquote className="my-2 border-l-4 border-[var(--v4-fg)] py-0 pl-5 sm:pl-8 lg:pl-10">
      <p className="mb-3 font-serif text-xl font-semibold italic leading-snug text-[var(--v4-fg)] sm:mb-4 sm:text-2xl sm:leading-[1.55] lg:text-3xl">
        &ldquo;{v4QuoteOfDay.text}&rdquo;
      </p>
      <cite className="text-sm not-italic tracking-wide text-[#a09c94] sm:text-base">
        — {v4QuoteOfDay.author}
      </cite>
    </blockquote>
  )
}
