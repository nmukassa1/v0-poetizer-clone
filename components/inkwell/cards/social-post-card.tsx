import type { SocialPost } from "@/lib/feed-data"
import { Actions, Avatar } from "@/components/inkwell/primitives"

export function SocialPostCard({ post }: { post: SocialPost }) {
  return (
    <article className="flex gap-2 border-b border-[var(--ink-border-soft)]/80 py-3 min-[480px]:gap-2.5 min-[480px]:py-3.5">
      <span className="max-[479px]:inline min-[480px]:hidden">
        <Avatar seed={post.author} size={28} />
      </span>
      <span className="hidden min-[480px]:inline">
        <Avatar seed={post.author} size={32} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-baseline gap-1.5">
          <span className="text-[11px] font-semibold text-[var(--ink-fg)] min-[480px]:text-xs">
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

/** @deprecated Use SocialPostCard */
export { SocialPostCard as SocialPost }
