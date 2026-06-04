import Link from "next/link"

export default function PieceNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="font-serif text-2xl font-semibold text-[var(--ink-fg)]">
        Piece not found
      </h1>
      <p className="mt-2 max-w-md font-serif text-[15px] text-[var(--ink-muted)]">
        This piece may have been removed or is not public yet.
      </p>
      <Link
        href="/browse"
        className="mt-6 rounded-full bg-[var(--ink-fg)] px-5 py-2.5 text-xs font-semibold tracking-wide text-[var(--ink-bg)]"
      >
        Browse pieces
      </Link>
    </div>
  )
}
