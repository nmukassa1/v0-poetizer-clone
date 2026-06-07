/**
 * Prisma 7 requires Node 20.19+, 22.12+, or 23+.
 */

import { existsSync } from "node:fs"
import { execFileSync } from "node:child_process"

const NODE22_CANDIDATES = [
  process.env.INKWELL_NODE,
  "/opt/homebrew/opt/node@22/bin/node",
  "/usr/local/opt/node@22/bin/node",
].filter(Boolean)

export function parseNodeVersion(version = process.version) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(version)
  if (!match) return null
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    raw: version,
  }
}

export function isPrismaNodeSupported(parts) {
  if (parts.major > 22) return true
  if (parts.major === 22 && parts.minor >= 12) return true
  if (parts.major === 20 && parts.minor >= 19) return true
  return false
}

export function nodeSupportMessage(parts) {
  return [
    `Node.js ${parts.raw} cannot run Prisma 7 in this project.`,
    "",
    "Required: Node 20.19+, 22.12+, or 23+",
    "",
    "Upgrade (pick one):",
    "",
    "  nvm install 22.12.0 && nvm use",
    "",
    "  brew install node@22",
    '  export PATH="/opt/homebrew/opt/node@22/bin:$PATH"',
    "",
    "Then verify: node -v",
    "And retry:    npm run build",
  ].join("\n")
}

function nodeVersion(nodePath) {
  return execFileSync(nodePath, ["-p", "process.version"], {
    encoding: "utf8",
  }).trim()
}

/** Node binary that satisfies Prisma 7 — may differ from the current process. */
export function resolveNodeBinary() {
  const current = parseNodeVersion()
  if (current && isPrismaNodeSupported(current)) {
    return { nodeBin: process.execPath, parts: current }
  }

  for (const candidate of NODE22_CANDIDATES) {
    if (!existsSync(candidate)) continue
    const parts = parseNodeVersion(nodeVersion(candidate))
    if (parts && isPrismaNodeSupported(parts)) {
      console.warn(
        `[inkwell] Using ${candidate} (${parts.raw}) — ${process.version} is too old for Prisma 7.`,
      )
      return { nodeBin: candidate, parts }
    }
  }

  console.error(nodeSupportMessage(current ?? { raw: process.version }))
  process.exit(1)
}

export function ensureNodeForPrisma() {
  const { nodeBin, parts } = resolveNodeBinary()
  return { env: { ...process.env }, parts, nodeBin }
}
