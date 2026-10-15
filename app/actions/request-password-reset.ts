"use server"

import { headers } from "next/headers"
import { auth } from "@/lib/auth/server"
import { type AuthFormState } from "@/lib/auth/form-state"
import { forgotPasswordSchema } from "@/lib/validations/auth"

const GENERIC_MESSAGE =
  "If an account exists for that email, we've sent a link to reset your password. It expires in 15 minutes."

async function getRequestOrigin() {
  const headerList = await headers()
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host")
  const protocol =
    headerList.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https")
  return `${protocol}://${host}`
}

export async function requestPasswordResetAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  })

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const origin = await getRequestOrigin()

  try {
    const { error } = await auth.requestPasswordReset({
      email: parsed.data.email.toLowerCase(),
      redirectTo: `${origin}/reset-password`,
    })

    if (error) {
      console.error("requestPasswordReset failed", error)
    }
  } catch (error) {
    console.error("requestPasswordReset threw", error)
  }

  return { success: true, error: null, message: GENERIC_MESSAGE }
}
