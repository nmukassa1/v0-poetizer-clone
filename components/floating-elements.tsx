"use client"

import Link from "next/link"
import { Twitter, Instagram, Mail } from "lucide-react"

export function SocialSidebar() {
  return (
    <div className="fixed bottom-8 left-8 flex items-center gap-0.5 rounded-lg border border-border bg-background px-2 py-1.5 shadow-sm">
      <Link
        href="#"
        className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-accent transition-colors"
        aria-label="Twitter"
      >
        <Twitter className="h-4 w-4" strokeWidth={1.25} />
      </Link>
      <Link
        href="#"
        className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-accent transition-colors"
        aria-label="Instagram"
      >
        <Instagram className="h-4 w-4" strokeWidth={1.25} />
      </Link>
      <Link
        href="#"
        className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-accent transition-colors"
        aria-label="Email"
      >
        <Mail className="h-4 w-4" strokeWidth={1.25} />
      </Link>
    </div>
  )
}

export function GetAppButton() {
  return (
    <Link
      href="#"
      className="fixed bottom-8 right-8 rounded-lg border border-border bg-background px-5 py-2.5 text-[13px] font-medium text-foreground hover:bg-secondary hover:border-foreground/20 transition-all shadow-sm"
    >
      Get the app
    </Link>
  )
}
