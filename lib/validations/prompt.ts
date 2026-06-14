import { z } from "zod"

const promptStatusSchema = z.enum(["ACTIVE", "VOTING", "CLOSED"])

export const createPromptSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").max(200),
    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .max(80)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must use lowercase letters, numbers, and hyphens",
      ),
    description: z.string().trim().min(1, "Description is required").max(2000),
    status: promptStatusSchema.default("CLOSED"),
    startsAt: z.string().datetime({ message: "Start date is required" }),
    endsAt: z.string().datetime({ message: "End date is required" }),
  })
  .refine((data) => new Date(data.endsAt) > new Date(data.startsAt), {
    message: "End date must be after start date",
    path: ["endsAt"],
  })

const promptFieldsSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(80)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must use lowercase letters, numbers, and hyphens",
    ),
  description: z.string().trim().min(1, "Description is required").max(2000),
  status: promptStatusSchema,
  startsAt: z.string().datetime({ message: "Start date is required" }),
  endsAt: z.string().datetime({ message: "End date is required" }),
})

export const updatePromptSchema = promptFieldsSchema.partial()

export type CreatePromptInput = z.infer<typeof createPromptSchema>
export type UpdatePromptInput = z.infer<typeof updatePromptSchema>
