import "./v4-theme.css"

export default function V4Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="v4-theme">{children}</div>
}
