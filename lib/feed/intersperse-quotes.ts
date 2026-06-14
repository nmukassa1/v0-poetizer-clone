import type { PiecePost } from "@/lib/feed/types"

export type QuoteSnippet = {
  id: string
  text: string
  author: string
}

export type QuoteFeedItem = QuoteSnippet & {
  kind: "quote"
}

export type RecentFeedEntry = PiecePost | QuoteFeedItem

const QUOTE_EVERY = 5

export function intersperseFeedQuotes(
  pieces: PiecePost[],
  quotes: QuoteSnippet[],
): RecentFeedEntry[] {
  if (quotes.length === 0) return pieces

  const result: RecentFeedEntry[] = []
  let quoteIndex = 0

  for (let index = 0; index < pieces.length; index++) {
    result.push(pieces[index])

    if ((index + 1) % QUOTE_EVERY === 0) {
      const quote = quotes[quoteIndex % quotes.length]
      result.push({ kind: "quote", ...quote })
      quoteIndex++
    }
  }

  return result
}
