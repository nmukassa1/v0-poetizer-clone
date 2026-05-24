import type { V4Featured, V4PiecePost, V4SocialPost, V4WeeklyPrompt } from "@/lib/v4-feed-data"
import { Actions, Avatar, CommentIcon, HeartIcon, Tag } from "@/components/v4/primitives"

export function FeaturedCard({ post }: { post: V4Featured }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[var(--v4-featured-bg)] p-6 sm:rounded-2xl sm:p-8 lg:p-10 lg:pb-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />
      <div className="relative">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3 sm:mb-6 lg:mb-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--v4-featured-accent-border)] px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-[var(--v4-featured-accent)] sm:text-xs">
              FEATURED
            </span>
            <Tag label={post.type} />
          </div>
          <span className="text-xs text-[#3a5a50] sm:text-sm">{post.date}</span>
        </div>

        <h2 className="mb-4 font-serif text-2xl font-bold leading-tight tracking-tight text-[var(--v4-featured-title)] sm:mb-5 sm:text-3xl lg:text-4xl">
          {post.title}
        </h2>

        <p className="mb-6 whitespace-pre-line font-serif text-base leading-[1.9] text-[var(--v4-featured-body)] sm:mb-8 sm:text-lg lg:text-xl">
          {post.excerpt}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Avatar seed={post.author} size={44} />
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-[#c8e8de] sm:text-base">
                {post.author}
              </div>
              <div className="truncate text-xs text-[#4a8070] sm:text-sm">{post.bio}</div>
            </div>
          </div>
          <button
            type="button"
            className="w-full shrink-0 cursor-pointer rounded-full border-0 bg-[var(--v4-featured-accent)] px-5 py-2.5 text-sm font-semibold tracking-[0.03em] text-[var(--v4-featured-bg)] sm:w-auto"
          >
            Read →
          </button>
        </div>
      </div>
    </div>
  )
}

export function PromptRail({ prompt }: { prompt: V4WeeklyPrompt }) {
  return (
    <div>
      <div className="mb-4 flex flex-col gap-4 rounded-xl border border-[var(--v4-prompt-border)] bg-[var(--v4-prompt-bg)] p-5 sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6 lg:p-8">
        <div className="min-w-0">
          <div className="mb-1.5 text-[11px] font-bold tracking-[0.1em] text-[var(--v4-prompt-meta)] sm:text-xs">
            THIS WEEK&apos;S PROMPT
          </div>
          <div className="font-serif text-xl font-bold text-[var(--v4-prompt-title)] sm:text-2xl">
            &ldquo;{prompt.title}&rdquo;
          </div>
          <div className="mt-2 text-sm text-[var(--v4-prompt-meta)] sm:text-base">
            {prompt.count} submissions · {prompt.days} days left
          </div>
        </div>
        <button
          type="button"
          className="w-full shrink-0 cursor-pointer rounded-lg border-0 bg-[var(--v4-prompt-btn)] px-5 py-2.5 text-sm font-semibold tracking-[0.03em] text-white sm:w-auto sm:px-6 sm:py-3"
        >
          Write now
        </button>
      </div>

      <div className="v4-scrollbar-hide -mx-1 flex gap-3 overflow-x-auto px-1 pb-1 sm:gap-4">
        {prompt.submissions.map((s, i) => (
          <div
            key={i}
            className="min-w-[min(220px,80vw)] shrink-0 cursor-pointer rounded-xl border border-[var(--v4-prompt-border)] bg-white p-4 sm:min-w-[240px] sm:p-5 lg:min-w-[280px]"
          >
            <Tag label={s.type} />
            <div className="my-2 font-serif text-base font-semibold text-[var(--v4-prompt-title)] sm:my-3 sm:text-lg">
              {s.title}
            </div>
            <div className="mb-3 text-sm text-[var(--v4-prompt-meta)]">{s.author}</div>
            <div className="flex gap-3 text-sm text-[var(--v4-subtle)]">
              <span className="flex items-center gap-1">
                <HeartIcon /> {s.likes}
              </span>
              <span className="flex items-center gap-1">
                <CommentIcon /> {s.comments}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PieceCard({ post }: { post: V4PiecePost }) {
  return (
    <article className="flex gap-4 border-b border-[var(--v4-border-soft)] py-6 sm:gap-5 sm:py-8 lg:py-10">
      <Avatar seed={post.author} size={52} />
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-3 sm:gap-3">
          <span className="text-base font-semibold sm:text-lg">{post.author}</span>
          <Tag label={post.type} />
          <span className="w-full text-xs text-[#c8c4bb] sm:ml-auto sm:w-auto sm:text-sm">
            {post.date}
          </span>
        </div>
        <h3 className="mb-2 font-serif text-xl font-bold leading-snug sm:mb-3 sm:text-2xl lg:text-3xl">
          {post.title}
        </h3>
        <p className="whitespace-pre-line font-serif text-base leading-[1.8] text-[var(--v4-muted)] sm:text-lg lg:text-xl lg:leading-[1.75]">
          {post.excerpt}
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:flex-row sm:items-center sm:gap-5">
          <Actions likes={post.likes} comments={post.comments} shares={post.shares} />
          <button
            type="button"
            className="w-full cursor-pointer rounded-md border border-[#ddd8ce] bg-transparent px-3 py-1.5 text-sm text-[#8b8780] sm:ml-auto sm:w-auto sm:px-4 sm:py-2"
          >
            Continue reading →
          </button>
        </div>
      </div>
    </article>
  )
}

export function SocialPost({ post }: { post: V4SocialPost }) {
  return (
    <article className="flex gap-4 border-b border-[var(--v4-border-soft)] py-6 sm:gap-5 sm:py-8">
      <Avatar seed={post.author} size={52} />
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-baseline gap-2 sm:mb-3">
          <span className="text-base font-semibold sm:text-lg">{post.author}</span>
          <span className="text-sm text-[#c0bbb2]">@{post.handle}</span>
          <span className="w-full text-xs text-[#c8c4bb] sm:ml-auto sm:w-auto sm:text-sm">
            {post.time}
          </span>
        </div>
        <p className="text-base leading-[1.75] text-[#3a3830] sm:text-lg lg:text-xl">{post.text}</p>
        <div className="mt-4">
          <Actions
            likes={post.likes}
            comments={post.comments}
            shares={post.shares}
            small
          />
        </div>
      </div>
    </article>
  )
}
