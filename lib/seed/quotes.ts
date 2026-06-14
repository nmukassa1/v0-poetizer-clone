import type { PrismaClient } from "@/lib/generated/prisma/client"

export const SEED_QUOTES = [
  {
    text: "The first draft is just you telling yourself the story.",
    author: "Terry Pratchett",
  },
] as const

export async function seedQuotes(prisma: PrismaClient) {
  for (const quote of SEED_QUOTES) {
    const existing = await prisma.quote.findFirst({
      where: { text: quote.text, author: quote.author },
      select: { id: true },
    })

    if (!existing) {
      await prisma.quote.create({ data: quote })
    }
  }

  return SEED_QUOTES.length
}
