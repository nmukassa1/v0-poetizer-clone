import { QuoteCallout, ReadersLovingGrid, TrendingWriters } from "@/components/v5/features"
import { Divider } from "@/components/v5/primitives"
import { StreakWidget } from "@/components/v5/streak-widget"

export function DesktopSidebar({ showStreaks }: { showStreaks: boolean }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[68px] space-y-8">
        {showStreaks && (
          <section>
            <Divider label="Your streaks" />
            <StreakWidget stacked />
          </section>
        )}

        <section>
          <Divider label="Trending writers" />
          <TrendingWriters />
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
