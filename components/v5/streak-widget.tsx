import { BookIcon, PenIcon } from "@/components/v5/primitives"

const DAYS = ["M", "T", "W", "T", "F", "S", "S"]
const writeActive = [true, true, true, false, true, false, false]
const readActive = [true, true, true, true, true, false, false]

function StreakCard({
  label,
  icon,
  count,
  active,
}: {
  label: string
  icon: React.ReactNode
  count: number
  active: boolean[]
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[var(--v5-border)] bg-[var(--v5-bg)] p-3.5 max-[479px]:flex-row min-[480px]:block min-[480px]:p-[18px]">
      <div className="flex shrink-0 items-center gap-1.5 max-[479px]:mb-0 min-[480px]:mb-3">
        <span className="text-[var(--v5-subtle)]">{icon}</span>
        <span className="font-serif text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--v5-subtle)]">
          {label}
        </span>
      </div>

      <div className="hidden min-[480px]:mb-3.5 min-[480px]:flex min-[480px]:items-baseline min-[480px]:gap-1">
        <span className="font-serif text-[30px] font-bold leading-none">{count}</span>
        <span className="text-[11px] text-[var(--v5-subtle)]">days</span>
      </div>

      <div className="flex flex-1 flex-row min-[480px]:block">
        <div className="mr-3 flex shrink-0 items-baseline gap-1 max-[479px]:flex min-[480px]:hidden">
          <span className="font-serif text-[22px] font-bold leading-none">{count}</span>
          <span className="text-[10px] text-[var(--v5-subtle)]">days</span>
        </div>
        <div className="flex flex-1 gap-1">
          {DAYS.map((d, i) => (
            <div key={`${label}-${i}`} className="flex-1 text-center">
              <div
                className={`mb-1.5 h-[3px] rounded-sm ${active[i] ? "bg-[var(--v5-fg)]" : "bg-[var(--v5-border-soft)]"}`}
              />
              <span
                className={`font-sans text-[8px] ${active[i] ? "text-[var(--v5-fg)]" : "text-[#c8c4bb]"}`}
              >
                {d}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function StreakWidget({ stacked = false }: { stacked?: boolean }) {
  return (
    <div
      className={`grid gap-2 ${
        stacked ? "grid-cols-1 gap-3" : "grid-cols-1 min-[480px]:grid-cols-2 min-[480px]:gap-3"
      }`}
    >
      <StreakCard label="Writing streak" icon={<PenIcon />} count={4} active={writeActive} />
      <StreakCard label="Reading streak" icon={<BookIcon />} count={5} active={readActive} />
    </div>
  )
}
