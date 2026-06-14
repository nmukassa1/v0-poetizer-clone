import { z } from "zod"

export const createQuoteSchema = z.object({
  text: z.string().trim().min(1, "Quote text is required").max(2000),
  author: z.string().trim().min(1, "Author is required").max(200),
})

export const updateQuoteSchema = createQuoteSchema.partial()

export type CreateQuoteInput = z.infer<typeof createQuoteSchema>
export type UpdateQuoteInput = z.infer<typeof updateQuoteSchema>
