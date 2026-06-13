import type { PastPrompt, PiecePost, WeeklyPrompt } from "@/lib/feed";
import { PromptHero } from "./prompt-hero";
import { PromptScoreboard } from "./prompt-scoreboard";
import { PromptSubmissionsList } from "./prompt-submissions-list";

export function PromptsPage({
  currentPrompt,
  pastPrompts,
  submissions,
}: {
  currentPrompt: WeeklyPrompt;
  pastPrompts: PastPrompt[];
  submissions: PiecePost[];
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[760px] pb-20 lg:max-w-6xl lg:pb-24 xl:max-w-7xl mt-7">
      <div className="px-4 min-[480px]:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 lg:px-8 xl:gap-12 xl:px-10">
        <main className="min-w-0 space-y-10 min-[480px]:space-y-12 lg:space-y-14">
          <div className="lg:hidden">
            <PromptScoreboard
              pastPrompts={pastPrompts}
              currentPrompt={currentPrompt}
              variant="rail"
            />
          </div>

          <PromptHero prompt={currentPrompt} />
          <PromptSubmissionsList
            submissions={submissions}
            count={currentPrompt.count}
          />
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-[68px]">
            <PromptScoreboard
              pastPrompts={pastPrompts}
              currentPrompt={currentPrompt}
              variant="sidebar"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
