import type { ProfileTabKey } from "./types"

export function ProfileTabsNav({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: { key: ProfileTabKey; label: string }[]
  activeTab: ProfileTabKey
  onTabChange: (tab: ProfileTabKey) => void
}) {
  return (
    <nav
      className="mb-3 flex flex-wrap gap-1.5"
      aria-label="Profile tabs"
    >
      {tabs.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onTabChange(item.key)}
          className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-colors ${
            activeTab === item.key
              ? "border-[var(--ink-fg)] bg-[var(--ink-fg)] text-[var(--ink-bg)]"
              : "border-[var(--ink-border)] text-[var(--ink-muted)] hover:border-[var(--ink-fg)]/50"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
