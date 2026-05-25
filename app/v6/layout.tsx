import "../v5/v5-theme.css"

export default function V6Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="v5-theme">{children}</div>
}
