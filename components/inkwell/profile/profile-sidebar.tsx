import Link from "next/link"
import type { ProfileMode } from "./types"

export function ProfileSidebar({
  mode,
  latestDraftId,
}: {
  mode: ProfileMode
  latestDraftId?: string | null
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[82px] space-y-6">
        <section className="rounded-xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-4">
          <h3 className="font-serif text-base font-semibold text-[var(--ink-fg)]">
            {mode === "me" ? "Writing desk" : "About this writer"}
          </h3>
          <p className="mt-2 font-serif text-[13px] leading-relaxed text-[var(--ink-muted)]">
            {mode === "me"
              ? latestDraftId
                ? "Pick up your latest draft or start something new."
                : "Start a fresh piece whenever inspiration strikes."
              : "Follow to see new pieces as soon as they are published."}
          </p>
          {mode === "me" ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {latestDraftId ? (
                <Link
                  href={`/write?pieceId=${latestDraftId}`}
                  className="inline-flex rounded-full bg-[var(--ink-fg)] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--ink-bg)]"
                >
                  Continue draft
                </Link>
              ) : null}
              <Link
                href="/write?new=1"
                className={`inline-flex rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-wide ${
                  latestDraftId
                    ? "border border-[var(--ink-border)] text-[var(--ink-fg)]"
                    : "bg-[var(--ink-fg)] text-[var(--ink-bg)]"
                }`}
              >
                New piece
              </Link>
            </div>
          ) : (
            <button
              type="button"
              className="mt-4 inline-flex rounded-full border border-[var(--ink-border)] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--ink-fg)]"
            >
              Follow writer
            </button>
          )}
        </section>

        <section className="rounded-xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-4">
          <h3 className="font-serif text-base font-semibold text-[var(--ink-fg)]">
            Profile notes
          </h3>
          <ul className="mt-2 space-y-2 text-[12px] leading-relaxed text-[var(--ink-muted)]">
            <li>• Pieces link into the reader view.</li>
            <li>• Drafts open in the composer.</li>
            <li>• Profile mode can be replaced by real auth later.</li>
          </ul>
        </section>
      </div>
    </aside>
  )
}
