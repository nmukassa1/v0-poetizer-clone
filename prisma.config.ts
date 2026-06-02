import { existsSync } from "node:fs"
import { config } from "dotenv"
import { defineConfig, env } from "prisma/config"

for (const file of [".env", ".env.local"]) {
  if (existsSync(file)) {
    config({ path: file, override: true })
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
})
