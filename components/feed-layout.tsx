import { Header } from "@/components/header"
import { FeedNavigation } from "@/components/feed-navigation"
import { SocialSidebar, GetAppButton } from "@/components/floating-elements"

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FeedNavigation />
      <main>{children}</main>
      <SocialSidebar />
      <GetAppButton />
    </div>
  )
}
