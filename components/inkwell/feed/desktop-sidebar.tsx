import { Divider } from "@/components/inkwell/primitives"
import { WelcomeCard } from "@/components/inkwell/feed/welcome-card"

export function DesktopSidebar() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[68px] space-y-8">
        <section>
          <Divider label="Welcome to inkwell" />
          <WelcomeCard stacked />
        </section>
      </div>
    </aside>
  )
}
