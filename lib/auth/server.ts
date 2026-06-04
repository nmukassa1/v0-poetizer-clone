import { createNeonAuth } from "@neondatabase/auth/next/server"

function requireAuthEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

let authInstance: ReturnType<typeof createNeonAuth> | null = null

function getAuth() {
  if (!authInstance) {
    authInstance = createNeonAuth({
      baseUrl: requireAuthEnv("NEON_AUTH_BASE_URL"),
      cookies: {
        secret: requireAuthEnv("NEON_AUTH_COOKIE_SECRET"),
      },
    })
  }
  return authInstance
}

export const auth = {
  get handler() {
    return getAuth().handler
  },
  get middleware() {
    return getAuth().middleware
  },
  signIn: {
    email: (...args: Parameters<ReturnType<typeof createNeonAuth>["signIn"]["email"]>) =>
      getAuth().signIn.email(...args),
  },
  signUp: {
    email: (...args: Parameters<ReturnType<typeof createNeonAuth>["signUp"]["email"]>) =>
      getAuth().signUp.email(...args),
  },
  signOut: (...args: Parameters<ReturnType<typeof createNeonAuth>["signOut"]>) =>
    getAuth().signOut(...args),
  getSession: (...args: Parameters<ReturnType<typeof createNeonAuth>["getSession"]>) =>
    getAuth().getSession(...args),
  updateUser: (
    ...args: Parameters<ReturnType<typeof createNeonAuth>["updateUser"]>
  ) => getAuth().updateUser(...args),
  changePassword: (
    ...args: Parameters<ReturnType<typeof createNeonAuth>["changePassword"]>
  ) => getAuth().changePassword(...args),
  deleteUser: (
    ...args: Parameters<ReturnType<typeof createNeonAuth>["deleteUser"]>
  ) => getAuth().deleteUser(...args),
}

export async function getCurrentSession() {
  const { data: session } = await auth.getSession()
  return session
}

export async function getCurrentUser() {
  const session = await getCurrentSession()
  return session?.user ?? null
}
