import "../v5/v5-theme.css"

export default function V7Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="v5-theme">{children}</div>
}
