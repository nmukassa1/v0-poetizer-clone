import { ProfilePage } from "@/components/inkwell/profile/profile-page"
import { getCurrentUser } from "@/lib/auth/server"
import {
  getDraftPiecesByUserId,
  getProfileByUserId,
  getPublishedPiecesByHandle,
} from "@/lib/piece/queries"
import { draftToFeedPost, pieceToFeedPost } from "@/lib/piece/map"

export default async function MyProfilePage() {
  const user = await getCurrentUser()
  const profile = user ? await getProfileByUserId(user.id) : null

  const [published, drafts] = profile
    ? await Promise.all([
        getPublishedPiecesByHandle(profile.handle),
        getDraftPiecesByUserId(profile.id),
      ])
    : [[], []]

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
              followers: "—",
              following: "—",
            }
          : undefined
      }
      initialPublished={published.map(pieceToFeedPost)}
      initialDrafts={drafts.map(draftToFeedPost)}
      latestDraftId={drafts[0]?.id ?? null}
    />
  )
}
