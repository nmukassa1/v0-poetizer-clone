"use client"

import { useMemo, useState } from "react"
import type { PiecePost } from "@/lib/feed"
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
}: {
  piece: ReadingRoomPiece
  moreByAuthor: PiecePost[]
}) {
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
