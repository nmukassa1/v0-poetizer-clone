import { NextResponse } from "next/server"
import { listFollowingForHandle } from "@/lib/social/follow-queries"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ handle: string }> },
) {
  const { handle } = await params
  const profiles = await listFollowingForHandle(handle)

  if (profiles === null) {
    return NextResponse.json(
      { success: false, error: "Profile not found." },
      { status: 404 },
    )
  }

  return NextResponse.json({ success: true, profiles })
}
