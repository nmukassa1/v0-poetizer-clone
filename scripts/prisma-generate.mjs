import { existsSync } from "node:fs"
import { execSync } from "node:child_process"
import { config } from "dotenv"

for (const file of [".env", ".env.local"]) {
  if (existsSync(file)) {
    config({ path: file, override: true })
  }
}

// generate only validates the URL exists — no live connection required
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    "postgresql://placeholder:placeholder@localhost:5432/placeholder?sslmode=require"
}

execSync("prisma generate", { stdio: "inherit" })
