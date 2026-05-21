"use client"

import Link from "next/link"
import { Search, Bell, User } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <nav className="flex items-center gap-8">
          <Link 
            href="/about" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link 
            href="/discover" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Discover
          </Link>
        </nav>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-serif text-3xl font-bold italic tracking-tight text-foreground">
            Inkwell<span className="text-accent">|</span>
          </h1>
        </Link>

        <div className="flex items-center gap-5">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors">
            <User className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  )
}
