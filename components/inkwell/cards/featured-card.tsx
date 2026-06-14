import type { Featured } from "@/lib/feed";
import Link from "next/link";
import { Avatar, Tag } from "@/components/inkwell/primitives";

export function FeaturedCard({
  post,
  authorHref,
  readHref,
}: {
  post: Featured;
  authorHref?: string;
  readHref?: string;
}) {
  return (
    /* Card shell — dark green background, rounded corners, responsive padding */
    <div className="relative overflow-hidden rounded-[14px] bg-[var(--ink-featured-bg)] p-5 max-[479px]:px-5 max-[479px]:py-6 min-[480px]:p-8 min-[480px]:pb-7 lg:p-10 lg:pb-9 xl:p-11 xl:pb-10">
      {/* Texture overlay — subtle noise pattern behind content */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* Content layer — sits above texture */}
      <div className="relative">
        {/* Meta row — badges on the left, date on the right */}
        <div className="mb-4 flex items-start justify-between gap-2 min-[480px]:mb-5">
          {/* Badge group — "FEATURED" label + content type tag */}
          <div className="flex flex-wrap gap-2">
            {/* "FEATURED" pill badge */}
            <span className="rounded-full border border-[var(--ink-featured-accent-border)] px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.1em] text-[var(--ink-featured-accent)] min-[480px]:px-3 min-[480px]:py-1 min-[480px]:text-[11px]">
              FEATURED
            </span>

            {/* Content type tag — poem / story / essay */}
            <Tag label={post.type} />
          </div>

          {/* Publication date */}
          <span className="shrink-0 text-[11px] text-[#3a5a50] min-[480px]:text-xs text-white">
            {post.date}
          </span>
        </div>

        {/* Hero title */}
        <h2 className="mb-3.5 font-serif text-xl font-bold leading-[1.15] tracking-tight text-[var(--ink-featured-title)] min-[480px]:mb-4 min-[480px]:text-[26px] min-[480px]:leading-[1.12] lg:text-[32px] xl:text-[36px]">
          {post.title}
        </h2>

        {/* Excerpt / preview body text */}
        <p className="mb-5 whitespace-pre-line font-serif text-sm leading-[1.85] text-[var(--ink-featured-body)] min-[480px]:mb-6 min-[480px]:text-base min-[480px]:leading-[1.8] lg:text-[17px] lg:leading-[1.75] xl:text-lg lg:w-1/2">
          {post.excerpt}
        </p>

        {/* Footer row — author info on the left, CTA on the right */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Author block — avatar + name + bio */}
          <div className="flex items-center gap-3">
            {/* Avatar — mobile (≤479px) */}
            <span className="max-[479px]:inline min-[480px]:hidden">
              <Avatar seed={post.author} size={32} />
            </span>

            {/* Avatar — tablet (480px–1023px) */}
            <span className="hidden min-[480px]:inline lg:hidden">
              <Avatar seed={post.author} size={36} />
            </span>

            {/* Avatar — desktop (≥1024px) */}
            <span className="hidden lg:inline">
              <Avatar seed={post.author} size={40} />
            </span>

            {/* Author name + bio */}
            <div>
              {/* Author name — linked when authorHref is provided */}
              {authorHref ? (
                <Link
                  href={authorHref}
                  className="text-sm font-semibold text-[#c8e8de] underline-offset-4 hover:underline min-[480px]:text-[15px] lg:text-base"
                >
                  {post.author}
                </Link>
              ) : (
                <div className="text-sm font-semibold text-[#c8e8de] min-[480px]:text-[15px] lg:text-base">
                  {post.author}
                </div>
              )}

              {/* Author bio — hidden on mobile, visible from 480px+ */}
              <div className="hidden text-xs text-[#4a8070] min-[480px]:block lg:text-sm">
                {post.bio}
              </div>
            </div>
          </div>

          {/* "Read →" CTA button — linked when readHref is provided */}
          {readHref ? (
            <Link
              href={readHref}
              className="rounded-full border-0 bg-[var(--ink-featured-accent)] px-4 py-2 text-xs font-semibold tracking-[0.03em] text-[var(--ink-featured-bg)] transition-opacity hover:opacity-90 min-[480px]:px-5 min-[480px]:py-2.5 min-[480px]:text-sm"
            >
              Read →
            </Link>
          ) : (
            /* "Read →" CTA — static (no link) fallback */
            <span className="rounded-full border-0 bg-[var(--ink-featured-accent)] px-4 py-2 text-xs font-semibold tracking-[0.03em] text-[var(--ink-featured-bg)] min-[480px]:px-5 min-[480px]:py-2.5 min-[480px]:text-sm">
              Read →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
