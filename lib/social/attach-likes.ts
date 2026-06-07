import type { PiecePost } from "@/lib/feed/types"
import { getLikedPieceIdsForUser } from "./queries"

export async function attachLikedToFeedPosts(
  posts: PiecePost[],
  profileId: string | null | undefined,
): Promise<PiecePost[]> {
  if (!profileId || posts.length === 0) {
    return posts.map((post) => ({ ...post, likedByMe: false }))
  }

  const likedIds = await getLikedPieceIdsForUser(
    profileId,
    posts.map((post) => post.id),
  )

  return posts.map((post) => ({
    ...post,
    likedByMe: likedIds.has(post.id),
  }))
}
