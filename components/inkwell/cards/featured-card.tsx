import type { Featured } from "@/lib/feed-data"
import Link from "next/link"
import { Avatar, Tag } from "@/components/inkwell/primitives"

export function FeaturedCard({
  post,
  authorHref,
  readHref,
}: {
  post: Featured
  authorHref?: string
  readHref?: string
}) {
  return (
    <div className="relative overflow-hidden rounded-[14px] bg-[var(--ink-featured-bg)] p-[18px] max-[479px]:px-[18px] max-[479px]:py-5 min-[480px]:p-7 min-[480px]:pb-[22px] lg:p-9 lg:pb-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />
      <div className="relative">
        <div className="mb-3.5 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full border border-[var(--ink-featured-accent-border)] px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-[var(--ink-featured-accent)]">
              FEATURED
            </span>
            <Tag label={post.type} />
          </div>
          <span className="shrink-0 text-[10px] text-[#3a5a50]">{post.date}</span>
        </div>
        <h2 className="mb-3 font-serif text-lg font-bold leading-tight tracking-tight text-[var(--ink-featured-title)] min-[480px]:text-[22px] lg:text-[28px]">
          {post.title}
        </h2>
        <p className="mb-4 whitespace-pre-line font-serif text-[13px] leading-[1.9] text-[var(--ink-featured-body)] min-[480px]:mb-[18px] min-[480px]:text-sm">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="max-[479px]:inline min-[480px]:hidden">
              <Avatar seed={post.author} size={26} />
            </span>
            <span className="hidden min-[480px]:inline">
              <Avatar seed={post.author} size={30} />
            </span>
            <div>
              {authorHref ? (
                <Link
                  href={authorHref}
                  className="text-xs font-semibold text-[#c8e8de] underline-offset-4 hover:underline"
                >
                  {post.author}
                </Link>
              ) : (
                <div className="text-xs font-semibold text-[#c8e8de]">{post.author}</div>
              )}
              <div className="hidden text-[10px] text-[#4a8070] min-[480px]:block">{post.bio}</div>
            </div>
          </div>
          {readHref ? (
            <Link
              href={readHref}
              className="rounded-full border-0 bg-[var(--ink-featured-accent)] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.03em] text-[var(--ink-featured-bg)] transition-opacity hover:opacity-90"
            >
              Read →
            </Link>
          ) : (
            <span className="rounded-full border-0 bg-[var(--ink-featured-accent)] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.03em] text-[var(--ink-featured-bg)]">
              Read →
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
