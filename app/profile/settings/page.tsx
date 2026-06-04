import { redirect } from "next/navigation"
import {
  ProfileSettings,
  type ProfileSettingsData,
} from "@/components/inkwell/profile/profile-settings"
import { getCurrentUser } from "@/lib/auth/server"
import { getProfileByUserId } from "@/lib/piece/queries"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Profile settings | inkwell",
  description: "Manage your inkwell profile and account.",
}

export default async function ProfileSettingsPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in?callbackUrl=/profile/settings")
  }

  const profile = await getProfileByUserId(user.id)
  if (!profile) {
    redirect("/sign-up")
  }

  const initialProfile: ProfileSettingsData = {
    name: profile.name,
    handle: profile.handle,
    bio: profile.bio ?? "",
    location: profile.location ?? "",
  }

  return (
    <ProfileSettings
      email={user.email ?? ""}
      initialProfile={initialProfile}
    />
  )
}
