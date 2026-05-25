import type { V4Featured, V4SocialPost, V4WeeklyPrompt } from "@/lib/v4-feed-data"
import { PieceCard } from "@/components/v5/piece-card"
import { Actions, Avatar, CommentIcon, HeartIcon, Tag } from "@/components/v5/primitives"

export function FeaturedCard({ post }: { post: V4Featured }) {
  return (
    <div className="relative overflow-hidden rounded-[14px] bg-[var(--v5-featured-bg)] p-[18px] max-[479px]:px-[18px] max-[479px]:py-5 min-[480px]:p-7 min-[480px]:pb-[22px] lg:p-9 lg:pb-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />
      <div className="relative">
        <div className="mb-3.5 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full border border-[var(--v5-featured-accent-border)] px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-[var(--v5-featured-accent)]">
              FEATURED
            </span>
            <Tag label={post.type} />
          </div>
          <span className="shrink-0 text-[10px] text-[#3a5a50]">{post.date}</span>
        </div>
        <h2 className="mb-3 font-serif text-lg font-bold leading-tight tracking-tight text-[var(--v5-featured-title)] min-[480px]:text-[22px] lg:text-[28px]">
          {post.title}
        </h2>
        <p className="mb-4 whitespace-pre-line font-serif text-[13px] leading-[1.9] text-[var(--v5-featured-body)] min-[480px]:mb-[18px] min-[480px]:text-sm">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="max-[479px]:inline min-[480px]:hidden">
              <Avatar seed={post.author} size={26} />
            </span>
            <span className="hidden min-[480px]:inline">
              <Avatar seed={post.author} size={30} />
            </span>
            <div>
              <div className="text-xs font-semibold text-[#c8e8de]">{post.author}</div>
              <div className="hidden text-[10px] text-[#4a8070] min-[480px]:block">{post.bio}</div>
            </div>
          </div>
          <button
            type="button"
            className="cursor-pointer rounded-full border-0 bg-[var(--v5-featured-accent)] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.03em] text-[var(--v5-featured-bg)]"
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
      <div className="mb-3.5 flex flex-col gap-2.5 rounded-xl border border-[var(--v5-prompt-border)] bg-[var(--v5-prompt-bg)] p-3.5 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-3 min-[480px]:px-[18px] min-[480px]:py-3.5">
        <div>
          <div className="mb-1 text-[9px] font-bold tracking-[0.1em] text-[var(--v5-prompt-meta)]">
            THIS WEEK&apos;S PROMPT
          </div>
          <div className="font-serif text-sm font-bold text-[var(--v5-prompt-title)] min-[480px]:text-[15px]">
            &ldquo;{prompt.title}&rdquo;
          </div>
          <div className="mt-1 text-[11px] text-[var(--v5-prompt-meta)]">
            {prompt.count} submissions · {prompt.days} days left
          </div>
        </div>
        <button
          type="button"
          className="w-fit shrink-0 cursor-pointer rounded-lg border-0 bg-[var(--v5-prompt-btn)] px-3.5 py-2 text-[11px] font-semibold text-white"
        >
          Write now
        </button>
      </div>
      <div className="v5-scrollbar-hide flex gap-2.5 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0 xl:grid-cols-4">
        {prompt.submissions.map((s, i) => (
          <div
            key={i}
            className="min-w-[150px] shrink-0 cursor-pointer rounded-[10px] border border-[var(--v5-prompt-border)] bg-white p-3 min-[480px]:min-w-[170px] min-[480px]:px-3.5 lg:min-w-0"
          >
            <Tag label={s.type} />
            <div className="my-1.5 font-serif text-[13px] font-semibold text-[var(--v5-prompt-title)]">
              {s.title}
            </div>
            <div className="mb-2 text-[11px] text-[var(--v5-prompt-meta)]">{s.author}</div>
            <div className="flex gap-2.5 text-[11px] text-[var(--v5-subtle)]">
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

export function SocialPost({ post }: { post: V4SocialPost }) {
  return (
    <article className="flex gap-2 border-b border-[var(--v5-border-soft)]/80 py-3 min-[480px]:gap-2.5 min-[480px]:py-3.5">
      <span className="max-[479px]:inline min-[480px]:hidden">
        <Avatar seed={post.author} size={28} />
      </span>
      <span className="hidden min-[480px]:inline">
        <Avatar seed={post.author} size={32} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-baseline gap-1.5">
          <span className="text-[11px] font-semibold text-[var(--v5-fg)] min-[480px]:text-xs">
            {post.author}
          </span>
          <span className="text-[10px] text-[#c0bbb2]">@{post.handle}</span>
          <span className="ml-auto text-[9px] text-[#c8c4bb] min-[480px]:text-[10px]">
            {post.time}
          </span>
        </div>
        <p className="text-xs leading-[1.7] text-[#6b6860] min-[480px]:text-[13px]">{post.text}</p>
        <Actions likes={post.likes} comments={post.comments} shares={post.shares} small />
      </div>
    </article>
  )
}
