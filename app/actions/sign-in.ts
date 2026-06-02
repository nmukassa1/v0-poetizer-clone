"use server"

import { redirect } from "next/navigation"
import { auth } from "@/lib/auth/server"
import { type AuthFormState } from "@/lib/auth/form-state"
import { signInSchema } from "@/lib/validations/auth"

export async function signInAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const callbackUrl =
    (formData.get("callbackUrl") as string | null) || "/"

  const { error } = await auth.signIn.email({
    email: parsed.data.email.toLowerCase(),
    password: parsed.data.password,
  })

  if (error) {
    return {
      success: false,
      error: error.message || "Invalid email or password",
    }
  }

  redirect(callbackUrl)
}
