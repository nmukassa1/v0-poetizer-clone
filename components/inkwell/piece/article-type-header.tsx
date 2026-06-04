import type { ContentTag } from "@/lib/feed/types"
import { Tag } from "@/components/inkwell/primitives"

export function ArticleTypeHeader({
  type,
  isPoem,
  className = "mb-8",
}: {
  type: ContentTag
  isPoem: boolean
  className?: string
}) {
  return (
    <div
      className={`flex items-center gap-3 ${isPoem ? "justify-center" : ""} ${className}`}
    >
      {!isPoem && <span className="h-px flex-1 bg-[var(--ink-border)]" />}
      <Tag label={type} />
      {!isPoem && <span className="h-px flex-1 bg-[var(--ink-border)]" />}
    </div>
  )
}
