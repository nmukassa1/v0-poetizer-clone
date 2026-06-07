import type { Profile } from "@/lib/generated/prisma/client"
import type { PieceCommentView } from "@/lib/social/types"

type CommentRow = {
  id: string
  body: string
  createdAt: Date
  profileId: string
  profile: Pick<Profile, "id" | "name" | "handle">
}

function formatCommentDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function mapCommentRow(
  row: CommentRow,
  viewerProfileId?: string,
): PieceCommentView {
  return {
    id: row.id,
    body: row.body,
    createdAt: formatCommentDate(row.createdAt),
    author: {
      id: row.profile.id,
      name: row.profile.name,
      handle: row.profile.handle,
    },
    isMine: viewerProfileId === row.profileId,
  }
}
