import { Libre_Baskerville, Source_Sans_3 } from "next/font/google"
import "./v2-theme.css"

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-v2-serif",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-v2-sans",
})

export default function V2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`v2-theme ${libreBaskerville.variable} ${sourceSans.variable} font-[family-name:var(--font-v2-sans)] antialiased`}
    >
      {children}
    </div>
  )
}
