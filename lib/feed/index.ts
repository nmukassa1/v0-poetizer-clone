export type {
  ContentTag,
  Featured,
  FeedFilter,
  FeedItem,
  PiecePost,
  PromptSubmission,
  SocialPost,
  WeeklyPrompt,
} from "./types"

export { filterFeed } from "./filter"

export {
  featured,
  feedItems,
  lovedPieces,
  quoteOfDay,
  trendingWriters,
  weeklyPrompt,
} from "./mock-data"

export {
  FALLBACK_WRITER_SPOTLIGHT,
  WRITER_SPOTLIGHT_HANDLE,
  type WriterSpotlightData,
} from "./spotlight-data"
