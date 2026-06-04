import { NextResponse } from "next/server"
import { listPublishedPieces } from "@/lib/piece/queries"
import { pieceToFeedPost } from "@/lib/piece/map"
import { publishPiece } from "@/lib/piece/publish"
import type { ContentTag } from "@/lib/feed"

const VALID_TYPES = new Set(["poem", "story", "essay"])

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const typeParam = searchParams.get("type")
  const limitParam = searchParams.get("limit")

  const type =
    typeParam && VALID_TYPES.has(typeParam)
      ? (typeParam as ContentTag)
      : undefined

  const limit = limitParam ? Math.min(Number(limitParam) || 20, 100) : 20

  const pieces = await listPublishedPieces({ type, limit })

  return NextResponse.json({
    pieces: pieces.map(pieceToFeedPost),
  })
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 },
    )
  }

  const result = await publishPiece(body)

  if (!result.success) {
    const status = result.error.includes("signed in") ? 401 : 400
    return NextResponse.json(result, { status })
  }

  return NextResponse.json(result)
}
