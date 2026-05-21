"use client"

import { Header } from "@/components/v3/header"
import { FeedNavigation } from "@/components/v3/feed-navigation"
import { SocialSidebar, GetAppButton } from "@/components/v3/floating-elements"
import { LayoutProvider } from "@/lib/layout-context"

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <FeedNavigation />
        <main>{children}</main>
        <SocialSidebar />
        <GetAppButton />
      </div>
    </LayoutProvider>
  )
}
