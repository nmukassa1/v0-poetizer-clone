import { ProfilePage } from "@/components/inkwell/profile/profile-page"

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  return (
    <ProfilePage
      initialMode="public"
      initialPublicHandle={handle}
      lockMode
    />
  )
}
