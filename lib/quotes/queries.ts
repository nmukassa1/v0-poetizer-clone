import { prisma } from "@/lib/db"
import { quoteOfDay as fallbackQuote } from "@/lib/feed/mock-data"

export type QuoteView = {
  id: string
  text: string
  author: string
  createdAt: string
  updatedAt: string
}

export async function listQuoteRecords() {
  return prisma.quote.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export type QuoteSnippet = {
  id: string
  text: string
  author: string
}

export async function listQuotesForFeed(): Promise<QuoteSnippet[]> {
  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, text: true, author: true },
  })

  if (quotes.length === 0) {
    return [{ id: "fallback", ...fallbackQuote }]
  }

  return quotes
}

export async function getQuoteRecordById(id: string) {
  return prisma.quote.findUnique({
    where: { id },
  })
}

export async function loadAdminQuotesPageData(): Promise<QuoteView[]> {
  const quotes = await listQuoteRecords()

  return quotes.map((quote) => ({
    id: quote.id,
    text: quote.text,
    author: quote.author,
    createdAt: quote.createdAt.toISOString(),
    updatedAt: quote.updatedAt.toISOString(),
  }))
}

export async function getQuoteOfDay(): Promise<{ text: string; author: string }> {
  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: "asc" },
    select: { text: true, author: true },
  })

  if (quotes.length === 0) {
    return fallbackQuote
  }

  const dayIndex = Math.floor(Date.now() / 86_400_000)
  return quotes[dayIndex % quotes.length]
}
