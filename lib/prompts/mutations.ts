import { prisma } from "@/lib/db"
import {
  createPromptSchema,
  updatePromptSchema,
} from "@/lib/validations/prompt"
import { getPromptRecordById, getPromptRecordBySlug } from "@/lib/prompts/queries"

export type PromptMutationResult =
  | { success: true; id: string }
  | {
      success: false
      error: string
      fieldErrors?: Record<string, string[] | undefined>
    }

async function deactivateOtherActivePrompts(excludeId?: string) {
  await prisma.prompt.updateMany({
    where: {
      status: "ACTIVE",
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    data: { status: "CLOSED" },
  })
}

export async function createPromptRecord(
  input: unknown,
): Promise<PromptMutationResult> {
  const parsed = createPromptSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { title, slug, description, status, startsAt, endsAt } = parsed.data

  const existing = await getPromptRecordBySlug(slug)
  if (existing) {
    return { success: false, error: "A prompt with this slug already exists." }
  }

  try {
    if (status === "ACTIVE") {
      await deactivateOtherActivePrompts()
    }

    const prompt = await prisma.prompt.create({
      data: {
        title,
        slug,
        description,
        status,
        startsAt: new Date(startsAt),
        endsAt: new Date(endsAt),
      },
      select: { id: true },
    })

    return { success: true, id: prompt.id }
  } catch (error) {
    console.error("[createPromptRecord]", error)
    return { success: false, error: "Could not create prompt." }
  }
}

export async function updatePromptRecord(
  id: string,
  input: unknown,
): Promise<PromptMutationResult> {
  const parsed = updatePromptSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const existing = await getPromptRecordById(id)
  if (!existing) {
    return { success: false, error: "Prompt not found." }
  }

  const data = parsed.data

  if (data.slug && data.slug !== existing.slug) {
    const slugTaken = await getPromptRecordBySlug(data.slug)
    if (slugTaken) {
      return { success: false, error: "A prompt with this slug already exists." }
    }
  }

  const nextStartsAt = data.startsAt ? new Date(data.startsAt) : existing.startsAt
  const nextEndsAt = data.endsAt ? new Date(data.endsAt) : existing.endsAt

  if (nextEndsAt <= nextStartsAt) {
    return { success: false, error: "End date must be after start date." }
  }

  try {
    if (data.status === "ACTIVE") {
      await deactivateOtherActivePrompts(id)
    }

    await prisma.prompt.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.slug !== undefined ? { slug: data.slug } : {}),
        ...(data.description !== undefined
          ? { description: data.description }
          : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.startsAt !== undefined ? { startsAt: nextStartsAt } : {}),
        ...(data.endsAt !== undefined ? { endsAt: nextEndsAt } : {}),
      },
    })

    return { success: true, id }
  } catch (error) {
    console.error("[updatePromptRecord]", error)
    return { success: false, error: "Could not update prompt." }
  }
}

export async function deletePromptRecord(
  id: string,
): Promise<PromptMutationResult> {
  const existing = await getPromptRecordById(id)
  if (!existing) {
    return { success: false, error: "Prompt not found." }
  }

  try {
    await prisma.prompt.delete({ where: { id } })
    return { success: true, id }
  } catch (error) {
    console.error("[deletePromptRecord]", error)
    return { success: false, error: "Could not delete prompt." }
  }
}
