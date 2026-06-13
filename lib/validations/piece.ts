import { z } from "zod"

const contentTagSchema = z.enum(["poem", "story", "essay"])

const visibilitySchema = z.enum(["public", "followers", "draft"])

export const publishPieceSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  body: z.string().trim().min(1, "Body is required"),
  type: contentTagSchema,
  excerpt: z.string().trim().max(500).optional(),
  visibility: visibilitySchema.default("public"),
  tags: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  promptSlug: z.string().trim().min(1).max(80).optional().nullable(),
})

export const saveDraftPieceSchema = publishPieceSchema.partial({
  title: true,
  body: true,
})

export type PublishPieceInput = z.infer<typeof publishPieceSchema>
export type SaveDraftPieceInput = z.infer<typeof saveDraftPieceSchema>
