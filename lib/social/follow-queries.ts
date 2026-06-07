import { prisma } from "@/lib/db"

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
