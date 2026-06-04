export function HighlightPopover({
  position,
  onHighlight,
}: {
  position: { x: number; y: number }
  onHighlight: () => void
}) {
  return (
    <div
      className="pointer-events-none fixed z-40"
      style={{
        top: position.y,
        left: position.x,
        transform: "translate(-50%, -100%)",
      }}
    >
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault()
          onHighlight()
        }}
        onTouchStart={(e) => {
          e.preventDefault()
          onHighlight()
        }}
        className="pointer-events-auto cursor-pointer rounded-full bg-[var(--ink-fg)] px-3 py-1.5 text-[11px] font-semibold text-[var(--ink-bg)] shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:opacity-90"
      >
        Highlight
      </button>
    </div>
  )
}
