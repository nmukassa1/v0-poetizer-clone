export function ReadingProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="fixed left-0 right-0 top-0 z-40 h-[2px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-[var(--ink-accent)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
