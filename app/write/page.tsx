import { Composer } from "@/components/inkwell/write/composer"
import { getCurrentUser } from "@/lib/auth/server"
import { getProfileByUserId } from "@/lib/piece/queries"

export const dynamic = "force-dynamic"

export default async function WritePage() {
  const user = await getCurrentUser()
  const profile = user ? await getProfileByUserId(user.id) : null

  return (
    <Composer
      author={
        profile
          ? { name: profile.name, handle: profile.handle }
          : null
      }
    />
  )
}
