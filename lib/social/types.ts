export type PieceCommentView = {
  id: string
  body: string
  createdAt: string
  author: {
    id: string
    name: string
    handle: string
  }
  isMine: boolean
}

export type ProfileListItem = {
  id: string
  handle: string
  name: string
  bio: string | null
}
