import { Bold, Italic, Link2, Quote } from "lucide-react"

function ToolbarButton({
  onClick,
  label,
  icon,
}: {
  onClick: () => void
  label: string
  icon: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
      onTouchStart={(e) => {
        e.preventDefault()
        onClick()
      }}
      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-[var(--ink-bg)] transition-colors hover:bg-white/10"
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  )
}

export function ComposerFormatToolbar({
  position,
  onBold,
  onItalic,
  onBlockquote,
  onLink,
}: {
  position: { x: number; y: number }
  onBold: () => void
  onItalic: () => void
  onBlockquote: () => void
  onLink: () => void
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
      <div className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-[var(--ink-border)] bg-[var(--ink-fg)] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
        <ToolbarButton
          onClick={onBold}
          label="Bold"
          icon={<Bold className="h-3.5 w-3.5" strokeWidth={2.25} />}
        />
        <ToolbarButton
          onClick={onItalic}
          label="Italic"
          icon={<Italic className="h-3.5 w-3.5" strokeWidth={2.25} />}
        />
        <ToolbarButton
          onClick={onBlockquote}
          label="Blockquote"
          icon={<Quote className="h-3.5 w-3.5" strokeWidth={2.25} />}
        />
        <ToolbarButton
          onClick={onLink}
          label="Link"
          icon={<Link2 className="h-3.5 w-3.5" strokeWidth={2.25} />}
        />
      </div>
    </div>
  )
}
