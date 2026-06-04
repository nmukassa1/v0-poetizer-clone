"use client"

import type { ReactNode } from "react"
import { AuthProvider } from "@/components/inkwell/auth-provider"
import { AnnouncementBar } from "@/components/inkwell/announcement-bar"
import { Header } from "@/components/inkwell/Header"
import { FeedFilterProvider } from "@/components/inkwell/feed/feed-filter-context"
import { SiteFooter } from "@/components/inkwell/site-footer"

export function InkwellShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <FeedFilterProvider>
        <div className="flex min-h-screen flex-col">
          <AnnouncementBar />
          <Header />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </FeedFilterProvider>
    </AuthProvider>
  )
}
