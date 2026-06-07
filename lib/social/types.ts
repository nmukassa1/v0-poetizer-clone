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
