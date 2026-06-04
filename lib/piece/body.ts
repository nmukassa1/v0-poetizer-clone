import type { ContentTag } from "@/lib/feed-data"

/** Strip HTML and split into display paragraphs (plain text for reading view). */
export function bodyHtmlToParagraphs(html: string, type: ContentTag): string[] {
  const withBreaks = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n\n")

  const plain = withBreaks
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim()

  if (!plain) return []

  if (type === "poem") {
    return plain
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
  }

  return plain
    .split(/\n\n+/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean)
}

export function readingTimeFromHtml(html: string): number {
  const plain = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  const words = plain ? plain.split(" ").length : 0
  return Math.max(1, Math.round(words / 220))
}
