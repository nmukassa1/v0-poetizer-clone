import "./v5-theme.css"

export default function V5Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="v5-theme">{children}</div>
}
