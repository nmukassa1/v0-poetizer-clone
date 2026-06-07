import { notFound } from "next/navigation"
import { ProfilePage } from "@/components/inkwell/profile/profile-page"
import { getCurrentUser } from "@/lib/auth/server"
import {
  getProfileByHandle,
  getPublishedPiecesByHandle,
} from "@/lib/piece/queries"
import { pieceToFeedPost } from "@/lib/piece/map"
import { attachLikedToFeedPosts } from "@/lib/social"

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
  const published = await getPublishedPiecesByHandle(handle)
  const publishedPosts = await attachLikedToFeedPosts(
    published.map(pieceToFeedPost),
    user?.id,
  )

  return (
    <ProfilePage
      initialMode="public"
      initialPublicHandle={handle}
      lockMode
      publicProfile={{
        handle: profile.handle,
        name: profile.name,
        location: profile.location ?? "—",
        bio: profile.bio ?? "Writer on inkwell.",
        followers: "—",
        following: "—",
      }}
      initialPublished={publishedPosts}
    />
  )
}
