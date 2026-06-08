import { prisma } from "@/lib/db"
import type { ProfileListItem } from "@/lib/social/types"

const profileListSelect = {
  id: true,
  handle: true,
  name: true,
  bio: true,
} as const

export async function isFollowingUser(
  followerId: string,
  followingId: string,
): Promise<boolean> {
  if (followerId === followingId) return false

  const row = await prisma.profileFollow.findUnique({
    where: {
      followerId_followingId: { followerId, followingId },
    },
    select: { followingId: true },
  })

  return Boolean(row)
}

export async function getFollowCounts(profileId: string) {
  const profile = await prisma.profile.findUnique({
    where: { id: profileId },
    select: { followerCount: true, followingCount: true },
  })

  return {
    followers: profile?.followerCount ?? 0,
    following: profile?.followingCount ?? 0,
  }
}

export async function getFollowingIdsForUser(
  followerId: string,
  profileIds: string[],
): Promise<Set<string>> {
  if (profileIds.length === 0) return new Set()

  const rows = await prisma.profileFollow.findMany({
    where: {
      followerId,
      followingId: { in: profileIds },
    },
    select: { followingId: true },
  })

  return new Set(rows.map((row) => row.followingId))
}

async function getProfileIdByHandle(handle: string) {
  const profile = await prisma.profile.findUnique({
    where: { handle },
    select: { id: true },
  })
  return profile?.id ?? null
}

export async function listFollowersForHandle(
  handle: string,
  limit = 100,
): Promise<ProfileListItem[] | null> {
  const profileId = await getProfileIdByHandle(handle)
  if (!profileId) return null

  const rows = await prisma.profileFollow.findMany({
    where: { followingId: profileId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      follower: { select: profileListSelect },
    },
  })

  return rows.map((row) => row.follower)
}

export async function listFollowingForHandle(
  handle: string,
  limit = 100,
): Promise<ProfileListItem[] | null> {
  const profileId = await getProfileIdByHandle(handle)
  if (!profileId) return null

  const rows = await prisma.profileFollow.findMany({
    where: { followerId: profileId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      following: { select: profileListSelect },
    },
  })

  return rows.map((row) => row.following)
}
