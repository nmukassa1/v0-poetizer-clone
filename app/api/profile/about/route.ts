import { NextResponse } from "next/server"
import { updateProfileAbout } from "@/lib/profile/update-profile-about"

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

  const result = await updateProfileAbout(body)

  if (!result.success) {
    const status = result.error.includes("signed in") ? 401 : 400
    return NextResponse.json(result, { status })
  }

  return NextResponse.json(result)
}
