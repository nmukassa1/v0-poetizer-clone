export function ArticleOrnament({
  isPoem,
  variant = "triple",
}: {
  isPoem: boolean
  variant?: "triple" | "single"
}) {
  const symbol = variant === "triple" ? "◆ ◆ ◆" : "◆"
  const useShortLines = variant === "single"

  return (
    <div
      className={`flex items-center gap-3 ${isPoem ? "justify-center" : ""}`}
      aria-hidden
    >
      {!isPoem && (
        <span
          className={
            useShortLines
              ? "h-px w-12 bg-[var(--ink-border)]"
              : "h-px flex-1 bg-[var(--ink-border)]"
          }
        />
      )}
      <span className="select-none font-serif text-xs tracking-[0.6em] text-[var(--ink-subtle)]">
        {symbol}
      </span>
      {!isPoem && (
        <span
          className={
            useShortLines
              ? "h-px w-12 bg-[var(--ink-border)]"
              : "h-px flex-1 bg-[var(--ink-border)]"
          }
        />
      )}
    </div>
  )
}
