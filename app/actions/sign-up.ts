"use server"

import { redirect } from "next/navigation"
import { auth } from "@/lib/auth/server"
import { ensureUserProfile, isHandleTaken } from "@/lib/auth/ensure-profile"
import { type AuthFormState } from "@/lib/auth/form-state"
import { signUpSchema } from "@/lib/validations/auth"

export async function signUpAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    handle: formData.get("handle"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { name, handle, email, password } = parsed.data

  if (await isHandleTaken(handle)) {
    return {
      success: false,
      error: "Handle already taken",
      fieldErrors: { handle: ["Handle already taken"] },
    }
  }

  const { data, error } = await auth.signUp.email({
    email: email.toLowerCase(),
    name,
    password,
  })

  if (error) {
    return {
      success: false,
      error: error.message || "Failed to create account",
    }
  }

  const userId = data?.user?.id

  if (!userId) {
    const session = await auth.getSession()
    const sessionUserId = session.data?.user?.id

    if (!sessionUserId) {
      return {
        success: false,
        error: "Account created but session could not be established.",
      }
    }

    await ensureUserProfile({
      userId: sessionUserId,
      handle,
      name,
    })

    redirect("/profile")
  }

  await ensureUserProfile({ userId, handle, name })

  const signInResult = await auth.signIn.email({
    email: email.toLowerCase(),
    password,
  })

  if (signInResult.error) {
    redirect("/sign-in")
  }

  redirect("/profile")
}
