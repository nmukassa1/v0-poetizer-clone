import { z } from "zod"

const handleRegex = /^[a-z0-9][a-z0-9_-]{2,29}$/

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Display name is required").max(80),
  handle: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      handleRegex,
      "Handle must be 3–30 characters: lowercase letters, numbers, _ or -",
    ),
  bio: z.string().trim().max(500).optional(),
  location: z.string().trim().max(80).optional(),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128),
    confirmPassword: z.string(),
    revokeOtherSessions: z.boolean().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Enter your password to confirm"),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
