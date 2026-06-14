"use client";

import { useMemo } from "react";
import { useAuth } from "@/components/inkwell/auth-provider";
import type { Featured, PiecePost } from "@/lib/feed";
import type { QuoteSnippet } from "@/lib/quotes/queries";
import { intersperseFeedQuotes } from "@/lib/feed/intersperse-quotes";
import type { LivePromptView } from "@/lib/prompts/types";
import { DesktopSidebar } from "@/components/inkwell/feed/desktop-sidebar";
import { FeedFeaturedSection } from "@/components/inkwell/feed/feed-featured-section";
import { FeedMobileStreakSection } from "@/components/inkwell/feed/feed-mobile-streak-section";
import { FeedPromptSection } from "@/components/inkwell/feed/feed-prompt-section";
import { FeedRecentSection } from "@/components/inkwell/feed/feed-recent-section";
import { filterFeedPieces } from "@/components/inkwell/feed/utils";

export function InkwellFeed({
  pieces,
  featured,
  featuredReadHref,
  livePrompt = null,
  quotes = [],
}: {
  pieces: PiecePost[];
  featured: Featured;
  featuredReadHref?: string;
  livePrompt?: LivePromptView | null;
  quotes?: QuoteSnippet[];
}) {
  const { isLoggedIn } = useAuth();
  const filter = "all";
  const visibleItems = useMemo(
    () => filterFeedPieces(pieces, filter),
    [pieces, filter],
  );
  const feedItems = useMemo(
    () => intersperseFeedQuotes(visibleItems, quotes),
    [visibleItems, quotes],
  );
  const showWelcome = !isLoggedIn;

  return (
    <div className="mx-auto min-h-screen w-full max-w-[760px] pb-20 lg:max-w-6xl lg:pb-24 xl:max-w-7xl">
      <div
        className={`px-4 min-[480px]:px-6 lg:px-8 xl:px-10 ${
          showWelcome
            ? "lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 xl:gap-12"
            : ""
        }`}
      >
        <main className="min-w-0">
          {showWelcome && <FeedMobileStreakSection />}

          {featured && (
            <FeedFeaturedSection
              featured={featured}
              readHref={featuredReadHref}
            />
          )}

          <FeedPromptSection livePrompt={livePrompt} />

          <FeedRecentSection items={feedItems} />
        </main>

        {showWelcome && <DesktopSidebar />}
      </div>
    </div>
  );
}
