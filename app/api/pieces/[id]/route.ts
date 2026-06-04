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
