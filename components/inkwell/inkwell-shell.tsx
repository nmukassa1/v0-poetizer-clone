"use client"

import type { ReactNode } from "react"
import { AuthProvider } from "@/components/inkwell/auth-provider"
import { AnnouncementBar } from "@/components/inkwell/announcement-bar"
import { SiteFooter } from "@/components/inkwell/site-footer"

export function InkwellShell({
  header,
  children,
}: {
  header: ReactNode
  children: ReactNode
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <AnnouncementBar />
        {header}
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </div>
    </AuthProvider>
  )
}
