import { Divider } from "@/components/inkwell/primitives"
import { WelcomeCard } from "@/components/inkwell/feed/welcome-card"

export function FeedMobileStreakSection() {
  return (
    <section className="lg:hidden">
      <Divider label="Welcome to inkwell" />
      <WelcomeCard />
    </section>
  )
}
