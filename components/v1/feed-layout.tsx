"use client"

import { Header } from "@/components/v1/header"
import { FeedNavigation } from "@/components/v1/feed-navigation"
import { SocialSidebar, GetAppButton } from "@/components/v1/floating-elements"
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
