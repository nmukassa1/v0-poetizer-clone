/** Compact display for profile follower/following counts. */
export function formatSocialCount(count: number): string {
  const safe = Math.max(0, count)
  if (safe >= 1_000_000) {
    const value = safe / 1_000_000
    return `${value >= 10 ? Math.round(value) : value.toFixed(1).replace(/\.0$/, "")}m`
  }
  if (safe >= 1_000) {
    const value = safe / 1_000
    return `${value >= 10 ? Math.round(value) : value.toFixed(1).replace(/\.0$/, "")}k`
  }
  return safe.toString()
}
