import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth/server"
import { createComment } from "@/lib/social/comment-piece"
import { listCommentsForPiece } from "@/lib/social/comment-queries"

function errorStatus(message: string): number {
  if (message.includes("signed in")) return 401
  if (message.includes("not found")) return 404
  return 400
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const user = await getCurrentUser()
  const comments = await listCommentsForPiece(id, user?.id)
  return NextResponse.json({ success: true, comments })
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const body = await request.json().catch(() => null)
  const result = await createComment(id, body?.body)

  if (!result.success) {
    return NextResponse.json(result, { status: errorStatus(result.error) })
  }

  return NextResponse.json(result)
}
