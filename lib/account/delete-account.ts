import { auth, getCurrentUser } from "@/lib/auth/server"
import { prisma } from "@/lib/db"
import { deleteAccountSchema } from "@/lib/validations/profile"

export type DeleteAccountResult =
  | { success: true }
  | {
      success: false
      error: string
      fieldErrors?: Record<string, string[] | undefined>
    }

export async function deleteAccount(
  input: unknown,
): Promise<DeleteAccountResult> {
  const user = await getCurrentUser()
  if (!user?.email) {
    return { success: false, error: "You must be signed in." }
  }

  const parsed = deleteAccountSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: "Please confirm your password.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { password } = parsed.data

  const { error: deleteError } = await auth.deleteUser({ password })

  if (deleteError) {
    return {
      success: false,
      error: deleteError.message || "Incorrect password or could not delete account.",
      fieldErrors: { password: ["Could not verify password"] },
    }
  }

  try {
    await prisma.profile.delete({ where: { id: user.id } })
  } catch (error) {
    console.error("[deleteAccount] profile", error)
  }

  await auth.signOut()

  return { success: true }
}
