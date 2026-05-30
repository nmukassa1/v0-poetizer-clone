import { SignInForm } from "@/components/inkwell/auth/auth-forms"
import { AuthPageLayout } from "@/components/inkwell/auth/auth-page-layout"

export const metadata = {
  title: "Sign in | inkwell",
  description: "Sign in to your inkwell account.",
}

export default function SignInPage() {
  return (
    <AuthPageLayout
      imageSrc="/images/auth-reading.png"
      imageAlt="Illustration of a person reading a book in an armchair"
    >
      <SignInForm />
    </AuthPageLayout>
  )
}
