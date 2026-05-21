"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const mainTabs = [
  { label: "All", href: "/v2" },
  { label: "Poems", href: "/v2/poems" },
  { label: "Stories", href: "/v2/stories" },
]

const sortTabs = ["Recent", "Following", "Top"]

export function FeedNavigation() {
  const pathname = usePathname()

  return (
    <div className="border-b border-border/60 bg-secondary/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex items-center gap-2">
          {mainTabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          {sortTabs.map((label, index) => (
            <button
              key={label}
              type="button"
              className={`rounded-full px-3 py-1.5 text-xs tracking-wide transition-colors ${
                index === 0
                  ? "bg-card text-foreground font-medium shadow-sm border border-border/60"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
