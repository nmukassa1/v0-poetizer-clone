import { ProfilePage } from "@/components/inkwell/profile/profile-page"
import { getCurrentUser } from "@/lib/auth/server"
import {
  getDraftPiecesByUserId,
  getProfileByUserId,
  getPublishedPiecesByHandle,
} from "@/lib/piece/queries"
import { draftToFeedPost, pieceToFeedPost } from "@/lib/piece/map"
import { attachLikedToFeedPosts, formatSocialCount, listLikedPiecesForProfile } from "@/lib/social"

export default async function MyProfilePage() {
  const user = await getCurrentUser()
  const profile = user ? await getProfileByUserId(user.id) : null

  const [published, drafts, likedPieces] = profile
    ? await Promise.all([
        getPublishedPiecesByHandle(profile.handle),
        getDraftPiecesByUserId(profile.id),
        listLikedPiecesForProfile(profile.id),
      ])
    : [[], [], []]

  const [publishedPosts, likedPosts] = await Promise.all([
    attachLikedToFeedPosts(published.map(pieceToFeedPost), user?.id),
    attachLikedToFeedPosts(likedPieces.map(pieceToFeedPost), user?.id),
  ])

  return (
    <ProfilePage
      initialMode="me"
      lockMode
      meProfile={
        profile
          ? {
              name: profile.name,
              handle: profile.handle,
              location: profile.location ?? "—",
              bio: profile.bio ?? "",
              about: profile.about ?? "",
              followers: formatSocialCount(profile.followerCount),
              following: formatSocialCount(profile.followingCount),
            }
          : undefined
      }
      initialPublished={publishedPosts}
      initialLikes={likedPosts}
      initialDrafts={drafts.map(draftToFeedPost)}
      latestDraftId={drafts[0]?.id ?? null}
      canEditAbout={Boolean(profile && user)}
    />
  )
}
