import type { BrowseFilter } from "./types";

export const BROWSE_FILTERS: { key: BrowseFilter; label: string }[] = [
  { key: "poems", label: "Poems" },
  { key: "stories", label: "Short stories" },
  { key: "essays", label: "Essays" },
];

export function browseFilterHref(filter: BrowseFilter) {
  return `/browse/${filter}`;
}

export function isBrowseFilter(value: string): value is BrowseFilter {
  return BROWSE_FILTERS.some((filter) => filter.key === value);
}

export function parseBrowseFilterParam(
  value: string | undefined,
): BrowseFilter | null {
  // if (!value || value === "all") return "all";
  // return isBrowseFilter(value) ? value : null;
  return value as BrowseFilter | null;
}

export function getActiveBrowseFilter(pathname: string): BrowseFilter | null {
  if (pathname === "/browse") return "all";

  const match = pathname.match(/^\/browse\/(poems|stories|essays)$/);
  if (match && isBrowseFilter(match[1])) {
    return match[1];
  }

  return null;
}
