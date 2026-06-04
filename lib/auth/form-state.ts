export type AuthFormState = {
  success: boolean
  error: string | null
  fieldErrors?: Record<string, string[] | undefined>
}

export const initialAuthState: AuthFormState = {
  success: false,
  error: null,
}
