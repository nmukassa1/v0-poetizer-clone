import { z } from "zod"

const handleRegex = /^[a-z0-9][a-z0-9_-]{2,29}$/

export const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export const signUpSchema = z
  .object({
    name: z.string().trim().min(1, "Display name is required").max(80),
    handle: z
      .string()
      .trim()
      .toLowerCase()
      .regex(
        handleRegex,
        "Handle must be 3–30 characters: lowercase letters, numbers, _ or -",
      ),
    email: z.string().trim().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
