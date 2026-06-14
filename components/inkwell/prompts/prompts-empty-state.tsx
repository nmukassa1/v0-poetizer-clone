import type { PastPrompt } from "@/lib/feed"
import { PromptScoreboard } from "./prompt-scoreboard"

export function PromptsEmptyState() {
  return (
    <section className="rounded-2xl border border-dashed border-[var(--ink-prompt-border)] bg-[var(--ink-prompt-bg)]/40 px-6 py-16 text-center min-[480px]:px-10 min-[480px]:py-20">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-prompt-meta)]">
        Weekly prompts
      </p>
      <h1 className="mt-3 font-serif text-2xl font-semibold text-[var(--ink-prompt-title)] min-[480px]:text-3xl">
        No prompt right now
      </h1>
      <p className="mx-auto mt-3 max-w-md font-serif text-[15px] leading-relaxed text-[var(--ink-prompt-title)]/75 min-[480px]:text-base">
        There isn&apos;t a live writing prompt at the moment. Check back later —
        or browse past prompts in the archive.
      </p>
    </section>
  )
}

export function PromptsEmptyPage({
  pastPrompts,
}: {
  pastPrompts: PastPrompt[]
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[760px] pb-20 lg:max-w-6xl lg:pb-24 xl:max-w-7xl mt-7">
      <div className="px-4 min-[480px]:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 lg:px-8 xl:gap-12 xl:px-10">
        <main className="min-w-0 space-y-10 min-[480px]:space-y-12 lg:space-y-14">
          <div className="lg:hidden">
            <PromptScoreboard
              pastPrompts={pastPrompts}
              currentPrompt={null}
              activeSlug=""
              variant="rail"
            />
          </div>

          <PromptsEmptyState />
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-[68px]">
            <PromptScoreboard
              pastPrompts={pastPrompts}
              currentPrompt={null}
              activeSlug=""
              variant="sidebar"
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
