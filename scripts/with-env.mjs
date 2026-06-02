#!/usr/bin/env node
/**
 * Runs a Prisma CLI command with env from .env then .env.local (Next.js convention).
 * Usage: node scripts/with-env.mjs prisma db push
 */
import { existsSync } from "node:fs"
import { spawnSync } from "node:child_process"
import { config } from "dotenv"

for (const file of [".env", ".env.local"]) {
  if (existsSync(file)) {
    config({ path: file, override: true })
  }
}

if (!process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL is not set. Add it to .env.local (see .env.example).",
  )
  process.exit(1)
}

const [command, ...args] = process.argv.slice(2)
if (!command) {
  console.error("Usage: node scripts/with-env.mjs <command> [args...]")
  process.exit(1)
}

const result = spawnSync(command, args, { stdio: "inherit", shell: true })
process.exit(result.status ?? 1)
