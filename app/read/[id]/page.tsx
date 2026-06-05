import { notFound } from "next/navigation"
import { ReadingRoom } from "@/components/inkwell/read/reading-room"
import { getCurrentUser } from "@/lib/auth/server"
import {
  countPublishedPiecesByAuthorId,
  getMoreByAuthor,
  getPublishedPieceById,
} from "@/lib/piece/queries"
import {
  pieceToFeedPost,
  pieceToReadingRoom,
} from "@/lib/piece/map"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const piece = await getPublishedPieceById(id)
  if (!piece) return { title: "Piece not found | inkwell" }
  return {
    title: `${piece.title} | inkwell`,
    description: piece.excerpt,
  }
}

export default async function ReadPiecePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const piece = await getPublishedPieceById(id)

  if (!piece) {
    notFound()
  }

  const [authorPieces, related, user] = await Promise.all([
    countPublishedPiecesByAuthorId(piece.authorId),
    getMoreByAuthor(piece.authorId, piece.id, piece.type, 2),
    getCurrentUser(),
  ])

  return (
    <ReadingRoom
      piece={pieceToReadingRoom(piece, authorPieces)}
      moreByAuthor={related.map(pieceToFeedPost)}
      canDelete={user?.id === piece.authorId}
    />
  )
}
