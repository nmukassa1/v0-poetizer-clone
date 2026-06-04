import { auth, getCurrentUser } from "@/lib/auth/server"
import { changePasswordSchema } from "@/lib/validations/profile"

export type ChangePasswordResult =
  | { success: true }
  | {
      success: false
      error: string
      fieldErrors?: Record<string, string[] | undefined>
    }

export async function changePassword(
  input: unknown,
): Promise<ChangePasswordResult> {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "You must be signed in." }
  }

  const parsed = changePasswordSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { currentPassword, newPassword, revokeOtherSessions } = parsed.data

  const { error } = await auth.changePassword({
    currentPassword,
    newPassword,
    revokeOtherSessions: revokeOtherSessions ?? false,
  })

  if (error) {
    return {
      success: false,
      error: error.message || "Could not update password.",
    }
  }

  return { success: true }
}
