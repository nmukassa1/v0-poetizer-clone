import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth/server"

function isServerActionRequest(request: NextRequest) {
  return (
    request.method === "POST" &&
    (request.headers.has("next-action") ||
      request.headers.get("accept")?.includes("text/x-component") === true)
  )
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Auth middleware can break Server Action RSC responses on protected routes.
  if (isServerActionRequest(request)) {
    return NextResponse.next()
  }

  const isProtected =
    pathname === "/write" ||
    pathname === "/profile" ||
    pathname.startsWith("/profile/settings") ||
    pathname.startsWith("/admin")

  if (isProtected) {
    const protectedMiddleware = auth.middleware({
      loginUrl: "/sign-in",
    })
    return protectedMiddleware(request)
  }

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    const { data: session } = await auth.getSession()
    if (session?.user) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/write",
    "/profile",
    "/profile/settings",
    "/admin/:path*",
    "/sign-in",
    "/sign-up",
  ],
}
