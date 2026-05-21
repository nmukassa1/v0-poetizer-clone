import Link from "next/link"
import { MessageCircle, Heart, BookOpen } from "lucide-react"
import type { ContentItem } from "@/lib/content"

export type { ContentItem }

function AuthorRow({
  author,
  date,
  size = "md",
}: {
  author: ContentItem["author"]
  date: string
  size?: "md" | "sm"
}) {
  const avatarSize = size === "md" ? "h-10 w-10" : "h-8 w-8"
  const textSize = size === "md" ? "text-sm" : "text-xs"

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${avatarSize} flex shrink-0 items-center justify-center rounded-full border border-border bg-secondary font-[family-name:var(--font-v2-serif)] text-muted-foreground`}
      >
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className={`${avatarSize} rounded-full object-cover`}
          />
        ) : (
          <span className={size === "md" ? "text-base" : "text-sm"}>
            {author.name.charAt(0)}
          </span>
        )}
      </div>
      <div>
        <p className={`${textSize} font-medium text-foreground`}>{author.name}</p>
        <p className="text-[11px] text-muted-foreground">{date}</p>
      </div>
    </div>
  )
}

function EngagementBar({ likes, comments }: { likes: number; comments: number }) {
  return (
    <div className="flex items-center gap-5">
      <button
        type="button"
        className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
      >
        <Heart
          className="h-4 w-4 group-hover:fill-accent/15"
          strokeWidth={1.5}
        />
        <span className="text-sm tabular-nums">{likes}</span>
      </button>
      <button
        type="button"
        className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
        <span className="text-sm tabular-nums">{comments}</span>
      </button>
    </div>
  )
}

export function FeaturedCard({ item }: { item: ContentItem }) {
  const excerpt = item.content.split("\n").filter(Boolean).slice(0, 5)

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border/60 bg-secondary/40 px-6 py-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            <BookOpen className="h-3 w-3" strokeWidth={2} />
            Featured {item.type}
          </span>
          <EngagementBar likes={item.likes} comments={item.comments} />
        </div>
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <h2 className="mb-6 font-[family-name:var(--font-v2-serif)] text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          {item.title}
        </h2>

        <div className="mb-8 max-w-3xl space-y-3 font-[family-name:var(--font-v2-serif)] text-lg leading-relaxed text-foreground/85 italic">
          {excerpt.map((line, index) => (
            <p key={index} className={index === 0 ? "not-italic text-foreground" : ""}>
              {line}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <AuthorRow author={item.author} date={item.date} />
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Read full {item.type}
          </Link>
        </div>
      </div>
    </article>
  )
}

export function CompactCard({ item }: { item: ContentItem }) {
  const preview = item.content.split("\n").filter(Boolean).slice(0, 2).join(" ")

  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {item.type}
        </span>
        <EngagementBar likes={item.likes} comments={item.comments} />
      </div>

      <h3 className="mb-3 font-[family-name:var(--font-v2-serif)] text-xl font-bold leading-snug text-foreground line-clamp-2 group-hover:text-accent transition-colors">
        {item.title}
      </h3>

      <p className="mb-5 flex-1 font-[family-name:var(--font-v2-serif)] text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {preview}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
        <AuthorRow author={item.author} date={item.date} size="sm" />
        <Link
          href="#"
          className="text-xs font-medium text-accent hover:underline underline-offset-2"
        >
          Read
        </Link>
      </div>
    </article>
  )
}
