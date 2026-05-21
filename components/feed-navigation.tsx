"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, List } from "lucide-react"

const mainTabs = [
  { label: "All", href: "/" },
  { label: "Poems", href: "/poems" },
  { label: "Stories", href: "/stories" },
]

const subTabs = [
  { label: "Recent", href: "?sort=recent" },
  { label: "Following", href: "?sort=following" },
  { label: "Top", href: "?sort=top" },
]

export function FeedNavigation() {
  const pathname = usePathname()

  return (
    <div className="border-b border-border bg-background py-8">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
              <LayoutGrid className="h-4 w-4" strokeWidth={1.25} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
              <List className="h-4 w-4" strokeWidth={1.25} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <nav className="flex items-center gap-10">
              {mainTabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`relative text-[13px] tracking-wide transition-colors ${
                    pathname === tab.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {pathname === tab.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-foreground" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              {subTabs.map((tab, index) => (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={`px-3 py-1 text-[11px] tracking-wide transition-colors rounded-full ${
                    index === 0
                      ? "text-foreground bg-secondary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="w-[76px]" />
        </div>
      </div>
    </div>
  )
}
