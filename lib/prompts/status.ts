import type { PromptStatus as DbPromptStatus } from "@/lib/generated/prisma/client"
import type { PromptStatus as UiPromptStatus } from "@/lib/feed"

export function dbPromptStatusToUi(status: DbPromptStatus): UiPromptStatus {
  switch (status) {
    case "ACTIVE":
      return "active"
    case "VOTING":
      return "voting"
    case "CLOSED":
      return "closed"
  }
}

export function uiPromptStatusToDb(status: UiPromptStatus): DbPromptStatus {
  switch (status) {
    case "active":
      return "ACTIVE"
    case "voting":
      return "VOTING"
    case "closed":
      return "CLOSED"
  }
}
