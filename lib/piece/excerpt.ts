const DEFAULT_MAX_LENGTH = 280

/** Build a feed-card excerpt from body text (strips simple HTML). */
export function excerptFromBody(
  body: string,
  maxLength = DEFAULT_MAX_LENGTH,
): string {
  const plain = body
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()

  if (plain.length <= maxLength) return plain

  const cut = plain.slice(0, maxLength)
  const lastSpace = cut.lastIndexOf(" ")
  const trimmed = lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut
  return `${trimmed}…`
}
