import Link from "next/link"
import type { Visibility } from "./types"

export function ComposerPublished({
  title,
  visibility,
  publishedPieceId,
}: {
  title: string
  visibility: Visibility
  publishedPieceId: string | null
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-md text-center">
        <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-accent)]">
          Published
        </span>
        <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-[var(--ink-fg)] min-[480px]:text-[36px]">
          Your piece is live.
        </h2>
        <p className="mt-3 font-serif text-[15px] leading-relaxed text-[var(--ink-muted)]">
          &ldquo;{title || "Untitled"}&rdquo;{" "}
          {visibility === "draft"
            ? "is saved as a draft on your profile."
            : "is now in the world. May it find the readers it\u2019s meant for."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-[var(--ink-fg)] px-5 py-2.5 text-xs font-semibold tracking-wide text-[var(--ink-bg)] transition-opacity hover:opacity-90"
          >
            Back to feed
          </Link>
          {publishedPieceId && visibility !== "draft" ? (
            <Link
              href={`/read/${publishedPieceId}`}
              className="rounded-full border border-[var(--ink-border)] px-5 py-2.5 text-xs font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)]"
            >
              View piece
            </Link>
          ) : (
            <Link
              href="/profile"
              className="rounded-full border border-[var(--ink-border)] px-5 py-2.5 text-xs font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)]"
            >
              View profile
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
