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
  console.error(
    "DATABASE_URL is not set. Add it to .env.local (see .env.example).",
  )
  process.exit(1)
}

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error("Usage: node scripts/prisma-cli.mjs <prisma-args...>")
  process.exit(1)
}

const { nodeBin, env } = ensureNodeForPrisma()
const prismaCli = join(root, "node_modules", "prisma", "build", "index.js")

execFileSync(nodeBin, [prismaCli, ...args], {
  stdio: "inherit",
  env,
  cwd: root,
})
