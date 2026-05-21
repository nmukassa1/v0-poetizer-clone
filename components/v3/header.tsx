"use client"

import Link from "next/link"
import { Search, Bell, User } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <nav className="flex items-center gap-10">
          <Link
            href="/about"
            className="text-[13px] tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/discover"
            className="text-[13px] tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Discover
          </Link>
        </nav>

        <Link href="/v3" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl tracking-[0.2em] text-foreground lowercase">
            inkwell
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.25} />
          </button>
          <div className="h-5 w-px bg-border" />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
          >
            <User className="h-4 w-4" strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </header>
  )
}
