import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth/server"

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected =
    pathname === "/write" ||
    pathname === "/profile" ||
    pathname.startsWith("/profile/settings")

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
    "/sign-in",
    "/sign-up",
  ],
}
