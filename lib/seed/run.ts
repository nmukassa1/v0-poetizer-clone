import { prisma } from "@/lib/db"
import { contentTagToPieceType } from "@/lib/piece/types"
import { SEED_PROFILES, SEED_USER_ID_PREFIX } from "./profiles"
import { SEED_PIECES } from "./pieces"

function publishedAt(daysAgo: number): Date {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() - daysAgo)
  date.setUTCHours(14, 0, 0, 0)
  return date
}

export async function clearSeedData() {
  const deletedPieces = await prisma.piece.deleteMany({
    where: { author: { id: { startsWith: SEED_USER_ID_PREFIX } } },
  })
  const deletedProfiles = await prisma.profile.deleteMany({
    where: { id: { startsWith: SEED_USER_ID_PREFIX } },
  })
  return { deletedPieces: deletedPieces.count, deletedProfiles: deletedProfiles.count }
}

export async function seedDatabase(options?: { clear?: boolean }) {
  if (options?.clear) {
    const cleared = await clearSeedData()
    console.log(
      `Cleared ${cleared.deletedPieces} pieces and ${cleared.deletedProfiles} seed profiles.`,
    )
  }

  for (const profile of SEED_PROFILES) {
    await prisma.profile.upsert({
      where: { handle: profile.handle },
      create: {
        id: profile.id,
        handle: profile.handle,
        name: profile.name,
        bio: profile.bio,
        location: profile.location,
      },
      update: {
        name: profile.name,
        bio: profile.bio,
        location: profile.location,
      },
    })
  }

  const profileByHandle = new Map(
    (
      await prisma.profile.findMany({
        where: { handle: { in: SEED_PROFILES.map((p) => p.handle) } },
        select: { id: true, handle: true },
      })
    ).map((p) => [p.handle, p.id]),
  )

  for (const piece of SEED_PIECES) {
    const authorId = profileByHandle.get(piece.authorHandle)
    if (!authorId) {
      throw new Error(`Missing seed profile for handle: ${piece.authorHandle}`)
    }

    await prisma.piece.upsert({
      where: { id: piece.id },
      create: {
        id: piece.id,
        title: piece.title,
        body: piece.body,
        excerpt: piece.excerpt,
        type: contentTagToPieceType(piece.type),
        status: "PUBLISHED",
        visibility: "PUBLIC",
        tags: piece.tags,
        likeCount: piece.likeCount,
        commentCount: piece.commentCount,
        shareCount: piece.shareCount,
        publishedAt: publishedAt(piece.publishedDaysAgo),
        authorId,
      },
      update: {
        title: piece.title,
        body: piece.body,
        excerpt: piece.excerpt,
        type: contentTagToPieceType(piece.type),
        status: "PUBLISHED",
        visibility: "PUBLIC",
        tags: piece.tags,
        likeCount: piece.likeCount,
        commentCount: piece.commentCount,
        shareCount: piece.shareCount,
        publishedAt: publishedAt(piece.publishedDaysAgo),
        authorId,
      },
    })
  }

  return {
    profiles: SEED_PROFILES.length,
    pieces: SEED_PIECES.length,
  }
}

async function main() {
  const clear = process.argv.includes("--clear")

  console.log("Seeding inkwell database…")
  const result = await seedDatabase({ clear })
  console.log(
    `Done. Upserted ${result.profiles} profiles and ${result.pieces} published pieces.`,
  )
}

const isDirectRun = process.argv[1]?.includes("lib/seed/run")

if (isDirectRun) {
  main()
    .catch((error) => {
      console.error("Seed failed:", error)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}
