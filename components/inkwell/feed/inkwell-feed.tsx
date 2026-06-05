"use client";

import { useMemo } from "react";
import { useAuth } from "@/components/inkwell/auth-provider";
import type { Featured, PiecePost } from "@/lib/feed/types";
import { DesktopSidebar } from "@/components/inkwell/feed/desktop-sidebar";
import { useFeedFilter } from "@/components/inkwell/feed/feed-filter-context";
import { FeedFeaturedSection } from "@/components/inkwell/feed/feed-featured-section";
import { FeedMobileStreakSection } from "@/components/inkwell/feed/feed-mobile-streak-section";
import { FeedPromptSection } from "@/components/inkwell/feed/feed-prompt-section";
import { FeedRecentSection } from "@/components/inkwell/feed/feed-recent-section";
import { filterFeedPieces } from "@/components/inkwell/feed/utils";

export function InkwellFeed({
  pieces,
  featured,
  featuredReadHref,
}: {
  pieces: PiecePost[];
  featured: Featured;
  featuredReadHref?: string;
}) {
  const { isLoggedIn } = useAuth();
  const feedFilter = useFeedFilter();
  const filter = feedFilter?.filter ?? "all";
  const visibleItems = useMemo(
    () => filterFeedPieces(pieces, filter),
    [pieces, filter],
  );
  const showFirstSlot = filter === "all";

  return (
    <div className="mx-auto min-h-screen w-full max-w-[760px] pb-20 lg:max-w-6xl lg:pb-24 xl:max-w-7xl">
      <div className="px-4 min-[480px]:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 lg:px-8  xl:gap-12 xl:px-10">
        <main className="min-w-0">
          {showFirstSlot && <FeedMobileStreakSection isLoggedIn={isLoggedIn} />}

          {featured && (
            <FeedFeaturedSection
              featured={featured}
              readHref={featuredReadHref}
            />
          )}

          <FeedPromptSection />

          <FeedRecentSection
            items={visibleItems}
            showFeatures={filter === "all"}
          />
        </main>

        {filter === "all" && (
          <DesktopSidebar
            isLoggedIn={isLoggedIn}
            showFirstSlot={showFirstSlot}
          />
        )}
      </div>
    </div>
  );
}
