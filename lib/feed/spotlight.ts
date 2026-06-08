import {
  WRITER_SPOTLIGHT_HANDLE,
  type WriterSpotlightData,
} from "@/lib/feed/spotlight-data"
import { prisma } from "@/lib/db"
import { pieceTypeToContentTag } from "@/lib/piece/types"
import { formatSocialCount, isFollowingUser } from "@/lib/social"

export {
  FALLBACK_WRITER_SPOTLIGHT,
  WRITER_SPOTLIGHT_HANDLE,
  type WriterSpotlightData,
} from "@/lib/feed/spotlight-data"

const publishedPublicWhere = {
  status: "PUBLISHED" as const,
  visibility: "PUBLIC" as const,
}

export async function getWriterSpotlight(
  viewerId?: string,
): Promise<WriterSpotlightData | null> {
  const profile = await prisma.profile.findUnique({
    where: { handle: WRITER_SPOTLIGHT_HANDLE },
    select: {
      id: true,
      handle: true,
      name: true,
      bio: true,
      location: true,
      followerCount: true,
    },
  })

  if (!profile) return null

  const [pieceCount, featuredPiece, initialFollowing] = await Promise.all([
    prisma.piece.count({
      where: { authorId: profile.id, ...publishedPublicWhere },
    }),
    prisma.piece.findFirst({
      where: { authorId: profile.id, ...publishedPublicWhere },
      orderBy: [{ likeCount: "desc" }, { publishedAt: "desc" }],
      select: { id: true, title: true, excerpt: true, type: true },
    }),
    viewerId && viewerId !== profile.id
      ? isFollowingUser(viewerId, profile.id)
      : Promise.resolve(false),
  ])

  return {
    name: profile.name,
    handle: profile.handle,
    location: profile.location ?? "—",
    bio:
      profile.bio ??
      "Editor of The Lantern Review. Writes at the edge of dusk, the seam of the day where memory loosens.",
    pieceCount,
    followerCountLabel: formatSocialCount(profile.followerCount),
    canFollow: viewerId !== profile.id,
    initialFollowing,
    featured: featuredPiece
      ? {
          id: featuredPiece.id,
          type: pieceTypeToContentTag(featuredPiece.type),
          title: featuredPiece.title,
          excerpt: featuredPiece.excerpt.replace(/\n/g, " ").slice(0, 120),
        }
      : null,
  }
}
