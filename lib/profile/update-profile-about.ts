import { getCurrentUser } from "@/lib/auth/server"
import { prisma } from "@/lib/db"
import { updateProfileAboutSchema } from "@/lib/validations/profile"

export type UpdateProfileAboutResult =
  | { success: true; about: string }
  | {
      success: false
      error: string
      fieldErrors?: Record<string, string[] | undefined>
    }

export async function updateProfileAbout(
  input: unknown,
): Promise<UpdateProfileAboutResult> {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "You must be signed in." }
  }

  const parsed = updateProfileAboutSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const aboutValue = parsed.data.about.trim() || null

  try {
    const profile = await prisma.profile.update({
      where: { id: user.id },
      data: { about: aboutValue },
      select: { about: true },
    })

    return {
      success: true,
      about: profile.about ?? "",
    }
  } catch (error) {
    console.error("[updateProfileAbout]", error)
    return {
      success: false,
      error: "Could not save your about section. Please try again.",
    }
  }
}
