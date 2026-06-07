import { existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"
import { config } from "dotenv"
import { ensureNodeForPrisma } from "./ensure-node.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

for (const file of [".env", ".env.local"]) {
  if (existsSync(join(root, file))) {
    config({ path: join(root, file), override: true })
  }
}

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    "postgresql://placeholder:placeholder@localhost:5432/placeholder?sslmode=require"
}

const { nodeBin, env } = ensureNodeForPrisma()
const prismaCli = join(root, "node_modules", "prisma", "build", "index.js")

execFileSync(nodeBin, [prismaCli, "generate"], {
  stdio: "inherit",
  env,
  cwd: root,
})
