"use client"

import type { ContentTag } from "@/lib/feed/types"

/** Split HTML body into block innerHTML strings (for composer preview). */
export function htmlBlocksFromBody(html: string, type: ContentTag): string[] {
  const tmp = document.createElement("div")
  tmp.innerHTML = html
  const blocks = Array.from(tmp.children).length
    ? Array.from(tmp.children)
    : [tmp]

  return blocks
    .map((b) =>
      b instanceof HTMLElement ? b.innerHTML : (b as Element).innerHTML,
    )
    .filter((s) => s.replace(/<br\s*\/?>/g, "").trim().length > 0)
}
