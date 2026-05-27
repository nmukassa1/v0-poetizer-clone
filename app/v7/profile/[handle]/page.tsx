import { ProfilePage } from "@/components/v7/profile-page"

export default async function V7PublicProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  return (
    <ProfilePage
      basePath="/v7"
      initialMode="public"
      initialPublicHandle={handle}
      lockMode
    />
  )
}
