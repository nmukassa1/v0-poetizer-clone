import Link from "next/link"
import { BookIcon, PenIcon } from "@/components/inkwell/primitives"

function WelcomePane({
  label,
  icon,
  headline,
  description,
  cta,
  href,
}: {
  label: string
  icon: React.ReactNode
  headline: string
  description: string
  cta: string
  href: string
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-3.5 max-[479px]:flex-row max-[479px]:items-center max-[479px]:gap-4 min-[480px]:block min-[480px]:p-[18px]">
      <div className="flex shrink-0 items-center gap-1.5 max-[479px]:mb-0 min-[480px]:mb-3">
        <span className="text-[var(--ink-subtle)]">{icon}</span>
        <span className="font-serif text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
          {label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 min-[480px]:gap-2.5">
        <p className="font-serif text-[15px] font-semibold leading-snug text-[var(--ink-fg)] min-[480px]:text-base">
          {headline}
        </p>
        <p className="hidden text-[11px] leading-relaxed text-[var(--ink-muted)] min-[480px]:block">
          {description}
        </p>
        <Link
          href={href}
          className="mt-auto inline-flex w-fit items-center gap-1 rounded-full border border-[var(--ink-fg)] bg-transparent px-3 py-1 text-[10px] font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:bg-[var(--ink-fg)] hover:text-[var(--ink-bg)] min-[480px]:px-3.5 min-[480px]:py-1.5 min-[480px]:text-[11px]"
        >
          {cta}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}

export function WelcomeCard({ stacked = false }: { stacked?: boolean }) {
  return (
    <div
      className={`grid gap-2 ${
        stacked ? "grid-cols-1 gap-3" : "grid-cols-1 min-[480px]:grid-cols-2 min-[480px]:gap-3"
      }`}
    >
      <WelcomePane
        label="For writers"
        icon={<PenIcon />}
        headline="Share your work"
        description="Publish poems, stories and essays. Build a streak as you write."
        cta="Start writing"
        href="/write"
      />
      <WelcomePane
        label="For readers"
        icon={<BookIcon />}
        headline="Find your next read"
        description="Save pieces you love and follow writers whose voices stay with you."
        cta="Browse pieces"
        href="/browse"
      />
    </div>
  )
}
