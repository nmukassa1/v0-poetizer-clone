"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

const DISMISS_KEY = "inkwell-announce-dismissed"

export function AnnouncementBar() {
  const message = process.env.NEXT_PUBLIC_ANNOUNCEMENT?.trim()
  const href = process.env.NEXT_PUBLIC_ANNOUNCEMENT_LINK?.trim() || "/about"
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    if (!message) return
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1")
  }, [message])

  if (!message || dismissed) {
    return null
  }

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1")
    setDismissed(true)
  }

  return (
    <div
      role="region"
      aria-label="Site announcement"
      className="border-b border-[var(--ink-prompt-border,#ccc9f4)] bg-[var(--ink-prompt-bg,#eeedfe)]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 min-[480px]:px-6 lg:px-8">
        <p className="min-w-0 text-center font-sans text-[11px] leading-snug text-[var(--ink-prompt-title,#26215c)] min-[480px]:text-xs">
          {message}{" "}
          <Link
            href={href}
            className="font-semibold text-[var(--ink-prompt-btn,#534ab7)] underline-offset-2 hover:underline"
          >
            Learn more →
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 cursor-pointer rounded-full p-1 text-[var(--ink-prompt-meta,#7f77dd)] transition-colors hover:bg-[color-mix(in_srgb,var(--ink-prompt-btn,#534ab7)_12%,transparent)] hover:text-[var(--ink-prompt-title,#26215c)]"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
