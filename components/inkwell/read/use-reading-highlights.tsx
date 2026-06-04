"use client"

import { useEffect, useMemo, useRef, useState } from "react"

export function useReadingHighlights() {
  const [highlights, setHighlights] = useState<string[]>([])
  const [popover, setPopover] = useState<{
    x: number
    y: number
    text: string
  } | null>(null)
  const articleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onSelectionChange = () => {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setPopover(null)
        return
      }
      const range = sel.getRangeAt(0)
      if (
        !articleRef.current ||
        !articleRef.current.contains(range.commonAncestorContainer)
      ) {
        setPopover(null)
        return
      }
      const text = sel.toString().trim()
      if (text.length === 0) {
        setPopover(null)
        return
      }
      const rect = range.getBoundingClientRect()
      setPopover({
        x: rect.left + rect.width / 2,
        y: rect.top - 6,
        text,
      })
    }

    const finalize = () => setTimeout(onSelectionChange, 10)

    document.addEventListener("mouseup", finalize)
    document.addEventListener("touchend", finalize)
    document.addEventListener("selectionchange", onSelectionChange)
    return () => {
      document.removeEventListener("mouseup", finalize)
      document.removeEventListener("touchend", finalize)
      document.removeEventListener("selectionchange", onSelectionChange)
    }
  }, [])

  function addHighlight() {
    if (!popover) return
    setHighlights((prev) =>
      prev.includes(popover.text) ? prev : [...prev, popover.text],
    )
    setPopover(null)
    window.getSelection()?.removeAllRanges()
  }

  const renderParagraph = useMemo(() => {
    return (text: string) => {
      if (highlights.length === 0) return text
      let parts: (string | { key: string; text: string })[] = [text]
      highlights.forEach((h, hi) => {
        const next: (string | { key: string; text: string })[] = []
        parts.forEach((part) => {
          if (typeof part !== "string") {
            next.push(part)
            return
          }
          let cursor = 0
          let idx = part.indexOf(h, cursor)
          let counter = 0
          while (idx !== -1) {
            const before = part.slice(cursor, idx)
            if (before) next.push(before)
            next.push({
              key: `h${hi}-${counter}`,
              text: part.slice(idx, idx + h.length),
            })
            cursor = idx + h.length
            counter += 1
            idx = part.indexOf(h, cursor)
          }
          const tail = part.slice(cursor)
          if (tail) next.push(tail)
        })
        parts = next
      })
      return parts.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part}</span>
        return (
          <mark
            key={i}
            className="rounded-sm bg-[var(--ink-accent-soft)] px-0.5 text-[var(--ink-fg)]"
          >
            {part.text}
          </mark>
        )
      })
    }
  }, [highlights])

  return {
    articleRef,
    highlights,
    popover,
    addHighlight,
    renderParagraph,
  }
}
