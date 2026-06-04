import { notFound } from "next/navigation"
import { ProfilePage } from "@/components/inkwell/profile/profile-page"
import {
  getProfileByHandle,
  getPublishedPiecesByHandle,
} from "@/lib/piece/queries"
import { pieceToFeedPost } from "@/lib/piece/map"

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

  const published = await getPublishedPiecesByHandle(handle)

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
      initialPublished={published.map(pieceToFeedPost)}
    />
  )
}
