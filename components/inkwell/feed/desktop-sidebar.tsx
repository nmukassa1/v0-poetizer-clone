import { QuoteCallout, ReadersLovingGrid } from "@/components/inkwell/features"
import { Divider } from "@/components/inkwell/primitives"
import { StreakWidget } from "@/components/inkwell/streak-widget"
import { WelcomeCard } from "@/components/inkwell/feed/welcome-card"
import { WriterSpotlight } from "@/components/inkwell/feed/writer-spotlight"

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
