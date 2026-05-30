import { SignUpForm } from "@/components/inkwell/auth/auth-forms"
import { AuthPageLayout } from "@/components/inkwell/auth/auth-page-layout"

export const metadata = {
  title: "Sign up | inkwell",
  description: "Create your inkwell account.",
}

export default function SignUpPage() {
  return (
    <AuthPageLayout
      imageSrc="/images/auth-typewriter.png"
      imageAlt="Illustration of a person typing at a vintage typewriter"
    >
      <SignUpForm />
    </AuthPageLayout>
  )
}
