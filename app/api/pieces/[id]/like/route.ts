import { NextResponse } from "next/server"
import { likePiece, unlikePiece } from "@/lib/social/like-piece"

function errorStatus(message: string): number {
  if (message.includes("signed in")) return 401
  if (message.includes("not found")) return 404
  return 400
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const result = await likePiece(id)

  if (!result.success) {
    return NextResponse.json(result, { status: errorStatus(result.error) })
  }

  return NextResponse.json(result)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const result = await unlikePiece(id)

  if (!result.success) {
    return NextResponse.json(result, { status: errorStatus(result.error) })
  }

  return NextResponse.json(result)
}
