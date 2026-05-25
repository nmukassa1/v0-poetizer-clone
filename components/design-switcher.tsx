"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const versions = [
  { id: "v1", label: "v1", href: "/" },
  { id: "v2", label: "v2", href: "/v2" },
  { id: "v3", label: "v3", href: "/v3" },
  { id: "v4", label: "v4", href: "/v4" },
  { id: "v5", label: "v5", href: "/v5" },
  { id: "v6", label: "v6", href: "/v6" },
] as const

function getActiveVersion(pathname: string) {
  if (pathname.startsWith("/v6")) return "v6"
  if (pathname.startsWith("/v5")) return "v5"
  if (pathname.startsWith("/v4")) return "v4"
  if (pathname.startsWith("/v2")) return "v2"
  if (pathname.startsWith("/v3")) return "v3"
  return "v1"
}

export function DesignSwitcher() {
  const pathname = usePathname()
  const active = getActiveVersion(pathname)

  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-lg border border-border bg-background/95 p-1 shadow-sm backdrop-blur-sm"
      role="navigation"
      aria-label="Design version"
    >
      {versions.map((version) => (
        <Link
          key={version.id}
          href={version.href}
          className={`rounded-md px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
            active === version.id
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {version.label}
        </Link>
      ))}
    </div>
  )
}
