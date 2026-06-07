import { NextResponse } from "next/server"
import { deleteComment } from "@/lib/social/comment-piece"

function errorStatus(message: string): number {
  if (message.includes("signed in")) return 401
  if (message.includes("not found")) return 404
  if (message.includes("only delete")) return 403
  return 400
}

export async function DELETE(
  _request: Request,
  {
    params,
  }: { params: Promise<{ id: string; commentId: string }> },
) {
  const { id, commentId } = await params
  const result = await deleteComment(id, commentId)

  if (!result.success) {
    return NextResponse.json(result, { status: errorStatus(result.error) })
  }

  return NextResponse.json(result)
}
