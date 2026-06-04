import { lovedPieces, type PiecePost } from "@/lib/feed-data"
import { getHandleForAuthor } from "@/lib/profiles"

export function lovedPieceToCard(item: (typeof lovedPieces)[number]): PiecePost {
  return {
    kind: "piece",
    id: `saved-${item.title}`,
    type: item.type,
    date: "Saved",
    title: item.title,
    author: item.author,
    authorHandle: getHandleForAuthor(item.author),
    excerpt: item.excerpt,
    likes: item.likes,
    comments: Math.max(4, Math.round(item.likes / 20)),
    shares: Math.max(2, Math.round(item.likes / 40)),
  }
}
