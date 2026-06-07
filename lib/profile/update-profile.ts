import { auth } from "@/lib/auth/server"
import { getCurrentUser } from "@/lib/auth/server"
import { isHandleTakenByOther } from "@/lib/auth/ensure-profile"
import { prisma } from "@/lib/db"
import { updateProfileSchema } from "@/lib/validations/profile"

export type UpdateProfileResult =
  | {
      success: true
      profile: {
        name: string
        handle: string
        bio: string
        location: string
      }
    }
  | {
      success: false
      error: string
      fieldErrors?: Record<string, string[] | undefined>
    }

export async function updateProfile(
  input: unknown,
): Promise<UpdateProfileResult> {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "You must be signed in." }
  }

  const parsed = updateProfileSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { name, handle, bio, location } = parsed.data

  if (await isHandleTakenByOther(handle, user.id)) {
    return {
      success: false,
      error: "Handle already taken",
      fieldErrors: { handle: ["Handle already taken"] },
    }
  }

  const bioValue = bio?.trim() || null
  const locationValue = location?.trim() || null

  const { error: authUpdateError } = await auth.updateUser({ name: name.trim() })
  if (authUpdateError) {
    return {
      success: false,
      error: authUpdateError.message || "Could not update account name.",
    }
  }

  try {
    const profile = await prisma.profile.update({
      where: { id: user.id },
      data: {
        name: name.trim(),
        handle,
        bio: bioValue,
        location: locationValue,
      },
      select: {
        name: true,
        handle: true,
        bio: true,
        location: true,
      },
    })

    return {
      success: true,
      profile: {
        name: profile.name,
        handle: profile.handle,
        bio: profile.bio ?? "",
        location: profile.location ?? "",
      },
    }
  } catch (error) {
    console.error("[updateProfile]", error)
    return {
      success: false,
      error: "Could not save profile. Please try again.",
    }
  }
}
