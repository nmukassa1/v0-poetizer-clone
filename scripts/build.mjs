import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"
import { resolveNodeBinary } from "./ensure-node.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const { nodeBin } = resolveNodeBinary()

execFileSync(nodeBin, [join(root, "scripts", "prisma-generate.mjs")], {
  stdio: "inherit",
  cwd: root,
})

execFileSync(
  nodeBin,
  [join(root, "node_modules", "next", "dist", "bin", "next"), "build"],
  { stdio: "inherit", cwd: root },
)
