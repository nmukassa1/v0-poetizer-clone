import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { BrowsePage } from "@/components/inkwell/browse/browse-page"
import {
  BROWSE_FILTERS,
  parseBrowseFilterParam,
} from "@/components/inkwell/browse/constants"
import { loadBrowsePageData } from "@/lib/browse/load-browse-page-data"

type BrowseFilterPageProps = {
  params: Promise<{ filter: string }>
}

export async function generateMetadata({
  params,
}: BrowseFilterPageProps): Promise<Metadata> {
  const { filter: filterParam } = await params
  const filter = parseBrowseFilterParam(filterParam)

  if (!filter || filter === "all") {
    return {
      title: "Browse pieces | inkwell",
    }
  }

  const label =
    BROWSE_FILTERS.find((entry) => entry.key === filter)?.label ?? filter

  return {
    title: `${label} | Browse | inkwell`,
    description: `Explore ${label.toLowerCase()} from writers on inkwell.`,
  }
}

export default async function BrowseFilterRoutePage({
  params,
}: BrowseFilterPageProps) {
  const { filter: filterParam } = await params
  const filter = parseBrowseFilterParam(filterParam)

  if (!filter || filter === "all") {
    notFound()
  }

  const data = await loadBrowsePageData()

  return <BrowsePage filter={filter} {...data} />
}
