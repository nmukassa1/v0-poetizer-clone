import { BookIcon, PenIcon } from "@/components/v5/primitives"

function WelcomePane({
  label,
  icon,
  headline,
  description,
  cta,
}: {
  label: string
  icon: React.ReactNode
  headline: string
  description: string
  cta: string
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-[var(--v5-border)] bg-[var(--v5-bg)] p-3.5 max-[479px]:flex-row max-[479px]:items-center max-[479px]:gap-4 min-[480px]:block min-[480px]:p-[18px]">
      <div className="flex shrink-0 items-center gap-1.5 max-[479px]:mb-0 min-[480px]:mb-3">
        <span className="text-[var(--v5-subtle)]">{icon}</span>
        <span className="font-serif text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--v5-subtle)]">
          {label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 min-[480px]:gap-2.5">
        <p className="font-serif text-[15px] font-semibold leading-snug text-[var(--v5-fg)] min-[480px]:text-base">
          {headline}
        </p>
        <p className="hidden text-[11px] leading-relaxed text-[var(--v5-muted)] min-[480px]:block">
          {description}
        </p>
        <button
          type="button"
          className="mt-auto inline-flex w-fit cursor-pointer items-center gap-1 rounded-full border border-[var(--v5-fg)] bg-transparent px-3 py-1 text-[10px] font-semibold tracking-wide text-[var(--v5-fg)] transition-colors hover:bg-[var(--v5-fg)] hover:text-[var(--v5-bg)] min-[480px]:px-3.5 min-[480px]:py-1.5 min-[480px]:text-[11px]"
        >
          {cta}
          <span aria-hidden>→</span>
        </button>
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
      />
      <WelcomePane
        label="For readers"
        icon={<BookIcon />}
        headline="Find your next read"
        description="Save pieces you love and follow writers whose voices stay with you."
        cta="Browse pieces"
      />
    </div>
  )
}
