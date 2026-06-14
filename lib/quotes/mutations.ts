import { prisma } from "@/lib/db"
import { getQuoteRecordById } from "@/lib/quotes/queries"
import {
  createQuoteSchema,
  updateQuoteSchema,
} from "@/lib/validations/quote"

export type QuoteMutationResult =
  | { success: true; id: string }
  | {
      success: false
      error: string
      fieldErrors?: Record<string, string[] | undefined>
    }

export async function createQuoteRecord(
  input: unknown,
): Promise<QuoteMutationResult> {
  const parsed = createQuoteSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const quote = await prisma.quote.create({
      data: parsed.data,
      select: { id: true },
    })

    return { success: true, id: quote.id }
  } catch (error) {
    console.error("[createQuoteRecord]", error)
    return { success: false, error: "Could not create quote." }
  }
}

export async function updateQuoteRecord(
  id: string,
  input: unknown,
): Promise<QuoteMutationResult> {
  const parsed = updateQuoteSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const existing = await getQuoteRecordById(id)
  if (!existing) {
    return { success: false, error: "Quote not found." }
  }

  try {
    await prisma.quote.update({
      where: { id },
      data: parsed.data,
    })

    return { success: true, id }
  } catch (error) {
    console.error("[updateQuoteRecord]", error)
    return { success: false, error: "Could not update quote." }
  }
}

export async function deleteQuoteRecord(
  id: string,
): Promise<QuoteMutationResult> {
  const existing = await getQuoteRecordById(id)
  if (!existing) {
    return { success: false, error: "Quote not found." }
  }

  try {
    await prisma.quote.delete({ where: { id } })
    return { success: true, id }
  } catch (error) {
    console.error("[deleteQuoteRecord]", error)
    return { success: false, error: "Could not delete quote." }
  }
}
