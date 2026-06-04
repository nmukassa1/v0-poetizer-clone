import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth/server"
import { getProfileByUserId } from "@/lib/piece/queries"
import { updateProfile } from "@/lib/profile/update-profile"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const profile = await getProfileByUserId(user.id)
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 })
  }

  return NextResponse.json({
    profile: {
      name: profile.name,
      handle: profile.handle,
      bio: profile.bio ?? "",
      location: profile.location ?? "",
    },
    email: user.email,
  })
}

export async function PATCH(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 },
    )
  }

  const result = await updateProfile(body)

  if (!result.success) {
    const status = result.error.includes("signed in") ? 401 : 400
    return NextResponse.json(result, { status })
  }

  return NextResponse.json(result)
}
