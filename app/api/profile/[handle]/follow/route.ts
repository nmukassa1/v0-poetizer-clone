import { NextResponse } from "next/server"
import {
  followProfileByHandle,
  getFollowStateByHandle,
  unfollowProfileByHandle,
} from "@/lib/social/follow-profile"

function errorStatus(message: string): number {
  if (message.includes("signed in")) return 401
  if (message.includes("not found")) return 404
  if (message.includes("yourself")) return 400
  return 400
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ handle: string }> },
) {
  const { handle } = await params
  const state = await getFollowStateByHandle(handle)

  if (!state) {
    return NextResponse.json(
      { success: false, error: "Profile not found." },
      { status: 404 },
    )
  }

  return NextResponse.json({ success: true, ...state })
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ handle: string }> },
) {
  const { handle } = await params
  const result = await followProfileByHandle(handle)

  if (!result.success) {
    return NextResponse.json(result, { status: errorStatus(result.error) })
  }

  return NextResponse.json(result)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ handle: string }> },
) {
  const { handle } = await params
  const result = await unfollowProfileByHandle(handle)

  if (!result.success) {
    return NextResponse.json(result, { status: errorStatus(result.error) })
  }

  return NextResponse.json(result)
}
