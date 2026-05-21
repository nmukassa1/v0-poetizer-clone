import { Header } from "@/components/v2/header"
import { FeedNavigation } from "@/components/v2/feed-navigation"

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <FeedNavigation />
      <main>{children}</main>
      <footer className="mt-16 border-t border-border/60 bg-card/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-center sm:flex-row sm:text-left">
          <p className="font-[family-name:var(--font-v2-serif)] text-lg font-bold text-foreground">
            inkwell
          </p>
          <p className="text-sm text-muted-foreground">
            A cozy corner for poets and storytellers to share their work.
          </p>
        </div>
      </footer>
    </div>
  )
}
