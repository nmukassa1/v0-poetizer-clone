"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, List } from "lucide-react"

const mainTabs = [
  { label: "ALL", href: "/" },
  { label: "POEMS", href: "/poems" },
  { label: "STORIES", href: "/stories" },
]

const subTabs = [
  { label: "RECENT", href: "?sort=recent" },
  { label: "FOLLOWING", href: "?sort=following" },
  { label: "TOP", href: "?sort=top" },
]

export function FeedNavigation() {
  const pathname = usePathname()

  return (
    <div className="border-b border-border bg-background py-6">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors">
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors">
              <List className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-3">
            <nav className="flex items-center gap-8">
              {mainTabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    pathname === tab.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </nav>

            <nav className="flex items-center gap-6">
              {subTabs.map((tab, index) => (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={`text-xs tracking-wide transition-colors ${
                    index === 0
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="w-[92px]" />
        </div>
      </div>
    </div>
  )
}
