import { prisma } from "@/lib/db"
import type { PieceWithAuthor } from "@/lib/piece/map"

const authorSelect = {
  name: true,
  handle: true,
  bio: true,
  location: true,
} as const

const promptSelect = {
  slug: true,
  title: true,
} as const

const pieceInclude = {
  author: { select: authorSelect },
  prompt: { select: promptSelect },
} as const

const publishedPublicWhere = {
  status: "PUBLISHED" as const,
  visibility: "PUBLIC" as const,
}

export async function getActivePromptRecord() {
  return prisma.prompt.findFirst({
    where: { status: "ACTIVE" },
    orderBy: { startsAt: "desc" },
  })
}

export async function getPromptRecordBySlug(slug: string) {
  return prisma.prompt.findUnique({
    where: { slug },
  })
}

export async function getPromptRecordById(id: string) {
  return prisma.prompt.findUnique({
    where: { id },
  })
}

export async function listPromptRecords() {
  return prisma.prompt.findMany({
    orderBy: { startsAt: "desc" },
  })
}

export async function countPromptSubmissions(slug: string) {
  return prisma.piece.count({
    where: {
      promptSlug: slug,
      ...publishedPublicWhere,
    },
  })
}

export async function listPublishedPiecesByPromptSlug(
  promptSlug: string,
  options?: {
    limit?: number
    order?: "recent" | "likes"
  },
) {
  const { limit = 50, order = "recent" } = options ?? {}

  return prisma.piece.findMany({
    where: {
      promptSlug,
      ...publishedPublicWhere,
    },
    orderBy:
      order === "likes"
        ? [{ likeCount: "desc" }, { publishedAt: "desc" }]
        : [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: limit,
    include: pieceInclude,
  }) as Promise<PieceWithAuthor[]>
}

export async function countSubmissionsForPrompts(slugs: string[]) {
  if (slugs.length === 0) return new Map<string, number>()

  const rows = await prisma.piece.groupBy({
    by: ["promptSlug"],
    where: {
      promptSlug: { in: slugs },
      ...publishedPublicWhere,
    },
    _count: { _all: true },
  })

  return new Map(
    rows
      .filter((row) => row.promptSlug)
      .map((row) => [row.promptSlug as string, row._count._all]),
  )
}

export async function getTopPiecesForPromptSlugs(
  slugs: string[],
  limitPerPrompt = 2,
) {
  const results = await Promise.all(
    slugs.map(async (slug) => ({
      slug,
      pieces: await listPublishedPiecesByPromptSlug(slug, {
        limit: limitPerPrompt,
        order: "likes",
      }),
    })),
  )

  return new Map(results.map(({ slug, pieces }) => [slug, pieces]))
}
