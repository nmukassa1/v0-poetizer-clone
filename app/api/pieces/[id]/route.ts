import { NextResponse } from "next/server"
import {
  countPublishedPiecesByAuthorId,
  getMoreByAuthor,
  getPublishedPieceById,
} from "@/lib/piece/queries"
import {
  pieceToFeedPost,
  pieceToReadingRoom,
} from "@/lib/piece/map"
import { deletePiece } from "@/lib/piece/delete-piece"
import { updatePiece } from "@/lib/piece/update-piece"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const result = await deletePiece(id)

  if (!result.success) {
    const status = result.error.includes("signed in")
      ? 401
      : result.error.includes("not found")
        ? 404
        : 400
    return NextResponse.json(result, { status })
  }

  return NextResponse.json(result)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 },
    )
  }

  const result = await updatePiece(id, body)

  if (!result.success) {
    const status = result.error.includes("signed in")
      ? 401
      : result.error.includes("not found")
        ? 404
        : 400
    return NextResponse.json(result, { status })
  }

  return NextResponse.json(result)
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const piece = await getPublishedPieceById(id)

  if (!piece) {
    return NextResponse.json({ error: "Piece not found" }, { status: 404 })
  }

  const [authorPieces, related] = await Promise.all([
    countPublishedPiecesByAuthorId(piece.authorId),
    getMoreByAuthor(piece.authorId, piece.id, piece.type, 2),
  ])

  return NextResponse.json({
    piece: pieceToReadingRoom(piece, authorPieces),
    related: related.map(pieceToFeedPost),
  })
}
