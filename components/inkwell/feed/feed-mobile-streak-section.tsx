import { Divider } from "@/components/inkwell/primitives"
import { StreakWidget } from "@/components/inkwell/streak-widget"
import { WelcomeCard } from "@/components/inkwell/feed/welcome-card"

export function FeedMobileStreakSection({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <section className="lg:hidden">
      <Divider label={isLoggedIn ? "Your streaks" : "Welcome to inkwell"} />
      {isLoggedIn ? <StreakWidget /> : <WelcomeCard />}
    </section>
  )
}
