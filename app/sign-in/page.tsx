import { SignInForm } from "@/components/inkwell/auth/sign-in-form"
import { AuthPageLayout } from "@/components/inkwell/auth/auth-page-layout"

export const metadata = {
  title: "Sign in | inkwell",
  description: "Sign in to your inkwell account.",
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams

  return (
    <AuthPageLayout
      imageSrc="/images/auth-reading.png"
      imageAlt="Illustration of a person reading a book in an armchair"
    >
      <SignInForm callbackUrl={callbackUrl ?? "/"} />
    </AuthPageLayout>
  )
}
