import { notFound } from "next/navigation"
import { ProfilePage } from "@/components/inkwell/profile/profile-page"
import { getCurrentUser } from "@/lib/auth/server"
import {
  getProfileByHandle,
  getPublishedPiecesByHandle,
} from "@/lib/piece/queries"
import { pieceToFeedPost } from "@/lib/piece/map"
import { attachLikedToFeedPosts, formatSocialCount, isFollowingUser, listLikedPiecesForProfile } from "@/lib/social"

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const profile = await getProfileByHandle(handle)

  if (!profile) {
    notFound()
  }

  const user = await getCurrentUser()
  const [published, likedPieces, initialFollowing] = await Promise.all([
    getPublishedPiecesByHandle(handle),
    listLikedPiecesForProfile(profile.id),
    user && user.id !== profile.id
      ? isFollowingUser(user.id, profile.id)
      : Promise.resolve(false),
  ])

  const [publishedPosts, likedPosts] = await Promise.all([
    attachLikedToFeedPosts(published.map(pieceToFeedPost), user?.id),
    attachLikedToFeedPosts(likedPieces.map(pieceToFeedPost), user?.id),
  ])

  return (
    <ProfilePage
      initialMode="public"
      initialPublicHandle={handle}
      lockMode
      canFollow={Boolean(user && user.id !== profile.id)}
      initialFollowing={initialFollowing}
      publicProfile={{
        handle: profile.handle,
        name: profile.name,
        location: profile.location ?? "—",
        bio: profile.bio ?? "Writer on inkwell.",
        followers: formatSocialCount(profile.followerCount),
        following: formatSocialCount(profile.followingCount),
      }}
      initialPublished={publishedPosts}
      initialLikes={likedPosts}
    />
  )
}
