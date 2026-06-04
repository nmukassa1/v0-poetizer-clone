import Link from "next/link"
import type { ProfileMode } from "./types"

export function ProfileSidebar({ mode }: { mode: ProfileMode }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[82px] space-y-6">
        <section className="rounded-xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-4">
          <h3 className="font-serif text-base font-semibold text-[var(--ink-fg)]">
            {mode === "me" ? "Writing desk" : "About this writer"}
          </h3>
          <p className="mt-2 font-serif text-[13px] leading-relaxed text-[var(--ink-muted)]">
            {mode === "me"
              ? "Continue your current draft or start a fresh piece."
              : "Follow to see new pieces as soon as they are published."}
          </p>
          {mode === "me" ? (
            <Link
              href="/write"
              className="mt-4 inline-flex rounded-full bg-[var(--ink-fg)] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--ink-bg)]"
            >
              New piece
            </Link>
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
