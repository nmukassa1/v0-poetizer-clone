import { getCurrentUser } from "@/lib/auth/server"
import { prisma } from "@/lib/db"

export type FollowProfileResult =
  | {
      success: true
      following: boolean
      followerCount: number
      followingCount: number
    }
  | { success: false; error: string }

async function getTargetProfileByHandle(handle: string) {
  return prisma.profile.findUnique({
    where: { handle },
    select: {
      id: true,
      handle: true,
      followerCount: true,
      followingCount: true,
    },
  })
}

async function getViewerProfile() {
  const user = await getCurrentUser()
  if (!user) return null

  return prisma.profile.findUnique({
    where: { id: user.id },
    select: { id: true, followingCount: true },
  })
}

export async function followProfileByHandle(
  handle: string,
): Promise<FollowProfileResult> {
  const viewer = await getViewerProfile()
  if (!viewer) {
    return { success: false, error: "You must be signed in to follow writers." }
  }

  const target = await getTargetProfileByHandle(handle)
  if (!target) {
    return { success: false, error: "Profile not found." }
  }

  if (target.id === viewer.id) {
    return { success: false, error: "You cannot follow yourself." }
  }

  const existing = await prisma.profileFollow.findUnique({
    where: {
      followerId_followingId: {
        followerId: viewer.id,
        followingId: target.id,
      },
    },
    select: { followingId: true },
  })

  if (existing) {
    return {
      success: true,
      following: true,
      followerCount: target.followerCount,
      followingCount: viewer.followingCount,
    }
  }

  try {
    const updated = await prisma.$transaction(async (tx) => {
      await tx.profileFollow.create({
        data: { followerId: viewer.id, followingId: target.id },
      })

      const [targetProfile, viewerProfile] = await Promise.all([
        tx.profile.update({
          where: { id: target.id },
          data: { followerCount: { increment: 1 } },
          select: { followerCount: true },
        }),
        tx.profile.update({
          where: { id: viewer.id },
          data: { followingCount: { increment: 1 } },
          select: { followingCount: true },
        }),
      ])

      return { targetProfile, viewerProfile }
    })

    return {
      success: true,
      following: true,
      followerCount: updated.targetProfile.followerCount,
      followingCount: updated.viewerProfile.followingCount,
    }
  } catch (error) {
    console.error("[followProfileByHandle]", error)
    return {
      success: false,
      error: "Could not follow this writer. Please try again.",
    }
  }
}

export async function unfollowProfileByHandle(
  handle: string,
): Promise<FollowProfileResult> {
  const viewer = await getViewerProfile()
  if (!viewer) {
    return {
      success: false,
      error: "You must be signed in to unfollow writers.",
    }
  }

  const target = await getTargetProfileByHandle(handle)
  if (!target) {
    return { success: false, error: "Profile not found." }
  }

  if (target.id === viewer.id) {
    return { success: false, error: "You cannot unfollow yourself." }
  }

  try {
    const updated = await prisma.$transaction(async (tx) => {
      const removed = await tx.profileFollow.deleteMany({
        where: { followerId: viewer.id, followingId: target.id },
      })

      if (removed.count === 0) {
        const [targetProfile, viewerProfile] = await Promise.all([
          tx.profile.findUniqueOrThrow({
            where: { id: target.id },
            select: { followerCount: true },
          }),
          tx.profile.findUniqueOrThrow({
            where: { id: viewer.id },
            select: { followingCount: true },
          }),
        ])
        return { targetProfile, viewerProfile }
      }

      const [targetProfile, viewerProfile] = await Promise.all([
        tx.profile.update({
          where: { id: target.id },
          data: { followerCount: { decrement: 1 } },
          select: { followerCount: true },
        }),
        tx.profile.update({
          where: { id: viewer.id },
          data: { followingCount: { decrement: 1 } },
          select: { followingCount: true },
        }),
      ])

      return { targetProfile, viewerProfile }
    })

    return {
      success: true,
      following: false,
      followerCount: Math.max(0, updated.targetProfile.followerCount),
      followingCount: Math.max(0, updated.viewerProfile.followingCount),
    }
  } catch (error) {
    console.error("[unfollowProfileByHandle]", error)
    return {
      success: false,
      error: "Could not unfollow this writer. Please try again.",
    }
  }
}

export async function getFollowStateByHandle(handle: string) {
  const target = await getTargetProfileByHandle(handle)
  if (!target) return null

  const viewer = await getViewerProfile()
  let following = false

  if (viewer && viewer.id !== target.id) {
    const row = await prisma.profileFollow.findUnique({
      where: {
        followerId_followingId: {
          followerId: viewer.id,
          followingId: target.id,
        },
      },
      select: { followingId: true },
    })
    following = Boolean(row)
  }

  return {
    handle: target.handle,
    followerCount: target.followerCount,
    followingCount: target.followingCount,
    following,
    isOwnProfile: viewer?.id === target.id,
  }
}
