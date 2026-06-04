import { Avatar } from "@/components/inkwell/primitives"

export function ArticleMeta({
  author,
  date,
  minutes,
  isPoem,
}: {
  author: string
  date: string
  minutes?: number
  isPoem: boolean
}) {
  return (
    <div
      className={`mb-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[var(--ink-muted)] ${
        isPoem ? "justify-center" : ""
      }`}
    >
      <Avatar seed={author} size={28} />
      <span className="font-medium text-[var(--ink-fg)]">{author}</span>
      <span className="text-[var(--ink-subtle)]">·</span>
      <span>{date}</span>
      {minutes !== undefined && (
        <>
          <span className="text-[var(--ink-subtle)]">·</span>
          <span>{minutes} min read</span>
        </>
      )}
    </div>
  )
}
