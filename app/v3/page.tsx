export default function DesignV3Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        Design preview
      </p>
      <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground">
        Version 3
      </h1>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        Build your alternate layout here. Components live in{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">components/v3/</code>.
      </p>
    </main>
  )
}
