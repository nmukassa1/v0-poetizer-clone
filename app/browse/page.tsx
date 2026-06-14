import { BrowsePage } from "@/components/inkwell/browse/browse-page"
import { loadBrowsePageData } from "@/lib/browse/load-browse-page-data"

export const metadata = {
  title: "Browse pieces | inkwell",
  description:
    "Explore poems, short stories, and essays from writers on inkwell.",
}

export default async function BrowseRoutePage() {
  const data = await loadBrowsePageData()

  return <BrowsePage filter="all" {...data} />
}
