import { prisma } from "@/lib/db"
import type { PieceType } from "@/lib/generated/prisma/client"
import type { ContentTag } from "@/lib/feed/types"
import { contentTagToPieceType } from "@/lib/piece/types"

const authorSelect = {
  name: true,
  handle: true,
  bio: true,
  location: true,
} as const

const publishedPublicWhere = {
  status: "PUBLISHED" as const,
  visibility: "PUBLIC" as const,
}

export async function listPublishedPieces(options?: {
  type?: ContentTag
  limit?: number
  excludeId?: string
}) {
  const { type, limit = 50, excludeId } = options ?? {}

  return prisma.piece.findMany({
    where: {
      ...publishedPublicWhere,
      ...(type ? { type: contentTagToPieceType(type) } : {}),
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: limit,
    include: { author: { select: authorSelect } },
  })
}

export async function getPublishedPieceById(id: string) {
  return prisma.piece.findFirst({
    where: { id, ...publishedPublicWhere },
    include: { author: { select: authorSelect } },
  })
}

export async function getPieceByIdForAuthor(id: string, authorId: string) {
  return prisma.piece.findFirst({
    where: { id, authorId },
    include: { author: { select: authorSelect } },
  })
}

export async function getFeaturedPiece() {
  return prisma.piece.findFirst({
    where: publishedPublicWhere,
    orderBy: [{ likeCount: "desc" }, { publishedAt: "desc" }],
    include: { author: { select: authorSelect } },
  })
}

export async function getProfileByHandle(handle: string) {
  return prisma.profile.findUnique({
    where: { handle },
    select: {
      id: true,
      handle: true,
      name: true,
      bio: true,
      about: true,
      location: true,
      followerCount: true,
      followingCount: true,
      _count: { select: { pieces: { where: publishedPublicWhere } } },
    },
  })
}

export async function getProfileByUserId(userId: string) {
  return prisma.profile.findUnique({
    where: { id: userId },
    select: {
      id: true,
      handle: true,
      name: true,
      bio: true,
      about: true,
      location: true,
      followerCount: true,
      followingCount: true,
    },
  })
}

export async function getPublishedPiecesByHandle(handle: string, limit = 50) {
  return prisma.piece.findMany({
    where: {
      ...publishedPublicWhere,
      author: { handle },
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: limit,
    include: { author: { select: authorSelect } },
  })
}

export async function getDraftPiecesByUserId(authorId: string, limit = 20) {
  return prisma.piece.findMany({
    where: { authorId, status: "DRAFT" },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: { author: { select: authorSelect } },
  })
}

export async function getLatestDraftByUserId(authorId: string) {
  return prisma.piece.findFirst({
    where: { authorId, status: "DRAFT" },
    orderBy: { updatedAt: "desc" },
    select: { id: true },
  })
}

export async function countPublishedPiecesByAuthorId(authorId: string) {
  return prisma.piece.count({
    where: { authorId, ...publishedPublicWhere },
  })
}

export async function getMoreByAuthor(
  authorId: string,
  excludeId: string,
  type?: PieceType,
  limit = 2,
) {
  return prisma.piece.findMany({
    where: {
      ...publishedPublicWhere,
      authorId,
      id: { not: excludeId },
      ...(type ? { type } : {}),
    },
    orderBy: [{ publishedAt: "desc" }],
    take: limit,
    include: { author: { select: authorSelect } },
  })
}
