"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
})

export type ContactFormState = {
  success: boolean
  error: string | null
  fieldErrors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const payload = parsed.data
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          message: payload.message,
          source: "inkwell-contact",
        }),
      })

      if (!response.ok) {
        return {
          success: false,
          error: "Something went wrong sending your message. Please try again.",
        }
      }
    } catch {
      return {
        success: false,
        error: "Something went wrong sending your message. Please try again.",
      }
    }
  } else if (process.env.NODE_ENV === "development") {
    console.info("[contact]", payload)
  }

  return { success: true, error: null }
}
