import { QuoteCallout, ReadersLovingGrid } from "@/components/v5/features"
import { Divider } from "@/components/v5/primitives"
import { StreakWidget } from "@/components/v5/streak-widget"
import { WelcomeCard } from "@/components/v7/welcome-card"
import { WriterSpotlight } from "@/components/v7/writer-spotlight"

export function DesktopSidebar({
  isLoggedIn,
  showFirstSlot,
}: {
  isLoggedIn: boolean
  showFirstSlot: boolean
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[68px] space-y-8">
        {showFirstSlot && (
          <section>
            <Divider label={isLoggedIn ? "Your streaks" : "Welcome to inkwell"} />
            {isLoggedIn ? <StreakWidget stacked /> : <WelcomeCard stacked />}
          </section>
        )}

        <section>
          <Divider label="Writer spotlight" />
          <WriterSpotlight />
        </section>

        <section>
          <Divider label="Readers are loving" />
          <ReadersLovingGrid variant="sidebar" />
        </section>

        <section>
          <Divider label="Worth remembering" />
          <QuoteCallout />
        </section>
      </div>
    </aside>
  )
}
