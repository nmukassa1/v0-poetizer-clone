"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import type { PiecePost } from "@/lib/feed"
import { DeletePieceDialog } from "@/components/inkwell/delete-piece-dialog"
import { bodyHtmlToParagraphs, readingTimeFromHtml } from "@/lib/piece/body"
import type { ReadingRoomPiece } from "@/lib/piece/map"
import { getProfileHrefByHandle } from "@/lib/profile"
import { AuthorBioCard } from "./author-bio-card"
import { HighlightPopover } from "./highlight-popover"
import { MoreFromAuthor } from "./more-from-author"
import { PieceArticle } from "./piece-article"
import { ReadingActionsBar } from "./reading-actions-bar"
import { ReadingProgressBar } from "./reading-progress-bar"
import { useReadingHighlights } from "./use-reading-highlights"
import { useScrollProgress } from "./use-scroll-progress"

export function ReadingRoom({
  piece,
  moreByAuthor,
  canDelete = false,
}: {
  piece: ReadingRoomPiece
  moreByAuthor: PiecePost[]
  canDelete?: boolean
}) {
  const router = useRouter()
  const paragraphs = useMemo(
    () => bodyHtmlToParagraphs(piece.bodyHtml, piece.type),
    [piece.bodyHtml, piece.type],
  )
  const progress = useScrollProgress()
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const { articleRef, highlights, popover, addHighlight, renderParagraph } =
    useReadingHighlights()

  const minutes = readingTimeFromHtml(piece.bodyHtml)
  const authorProfileHref = getProfileHrefByHandle(piece.authorHandle)

  return (
    <div className="min-h-screen pb-32">
      <ReadingProgressBar progress={progress} />

      <PieceArticle
        articleRef={articleRef}
        type={piece.type}
        title={piece.title}
        author={piece.author}
        date={piece.date}
        minutes={minutes}
        paragraphs={paragraphs}
        renderParagraph={renderParagraph}
      />

      {canDelete ? (
        <div className="mx-auto mt-8 max-w-2xl px-6 min-[480px]:px-8 lg:max-w-3xl lg:px-10">
          <DeletePieceDialog
            pieceId={piece.id}
            title={piece.title}
            onDeleted={() => router.push("/profile")}
            trigger={
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[#e8d4d4] px-4 py-2 font-sans text-[11px] font-semibold tracking-wide text-[#a33f3f] transition-colors hover:bg-[#fff5f5]"
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                Delete piece
              </button>
            }
          />
        </div>
      ) : null}

      <AuthorBioCard
        author={piece.author}
        authorHandle={piece.authorHandle}
        authorPieces={piece.authorPieces}
        authorBio={piece.authorBio}
        profileHref={authorProfileHref}
      />

      <MoreFromAuthor
        authorFirstName={piece.author.split(" ")[0]}
        pieces={moreByAuthor}
      />

      <ReadingActionsBar
        likes={piece.likes}
        comments={piece.comments}
        liked={liked}
        saved={saved}
        highlightCount={highlights.length}
        onLikeToggle={() => setLiked((v) => !v)}
        onSaveToggle={() => setSaved((v) => !v)}
      />

      {popover && (
        <HighlightPopover position={popover} onHighlight={addHighlight} />
      )}
    </div>
  )
}
