import type { PiecePost } from "@/lib/feed"
import { PieceCard } from "@/components/inkwell/piece-card"
import { Divider } from "@/components/inkwell/primitives"
import { getPublicProfileHref } from "@/lib/profile"

export function PromptSubmissionsList({
  submissions,
  count,
}: {
  submissions: PiecePost[]
  count: number
}) {
  return (
    <section>
      <Divider
        label={`${count} submission${count === 1 ? "" : "s"} for this prompt`}
        accent
      />

      {submissions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--ink-border)] px-6 py-16 text-center">
          <p className="font-serif text-lg text-[var(--ink-muted)]">
            No submissions yet.
          </p>
          <p className="mt-2 font-sans text-[13px] text-[var(--ink-subtle)]">
            Be the first to write a response to this week&apos;s prompt.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          {submissions.map((post) => (
            <PieceCard
              key={post.id}
              post={post}
              readHref={`/read/${post.id}`}
              authorHref={getPublicProfileHref(post.authorHandle)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
