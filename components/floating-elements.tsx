"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export function SocialSidebar() {
  return (
    <div className="fixed bottom-6 left-6 flex items-center gap-1 rounded-full border border-border bg-background px-3 py-2">
      <Link
        href="#"
        className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <Facebook className="h-4 w-4" strokeWidth={1.5} />
      </Link>
      <Link
        href="#"
        className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <Twitter className="h-4 w-4" strokeWidth={1.5} />
      </Link>
      <Link
        href="#"
        className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <Instagram className="h-4 w-4" strokeWidth={1.5} />
      </Link>
    </div>
  )
}

export function GetAppButton() {
  return (
    <Link
      href="#"
      className="fixed bottom-6 right-6 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
    >
      Get app
    </Link>
  )
}
