"use server"

import { redirect } from "next/navigation"
import { auth } from "@/lib/auth/server"
import { type AuthFormState } from "@/lib/auth/form-state"
import { resetPasswordSchema } from "@/lib/validations/auth"

export async function resetPasswordAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    return {
      success: false,
      error: fieldErrors.token
        ? "This reset link is invalid or has expired."
        : "Please fix the errors below.",
      fieldErrors,
    }
  }

  const { error } = await auth.resetPassword({
    newPassword: parsed.data.password,
    token: parsed.data.token,
  })

  if (error) {
    const isTokenError = /token|expired|invalid/i.test(error.message ?? "")
    return {
      success: false,
      error: isTokenError
        ? "This reset link is invalid or has expired."
        : error.message || "Failed to reset password",
      fieldErrors: isTokenError ? { token: ["expired"] } : undefined,
    }
  }

  redirect("/sign-in?reset=success")
}
