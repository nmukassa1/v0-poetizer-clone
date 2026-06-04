"use client";

import { useState } from "react";
import { useAuth } from "@/components/inkwell/auth-provider";
import {
  weeklyPrompt,
  type Featured,
  type PiecePost,
} from "@/lib/feed-data";
import { FeaturedCard, PromptRail } from "@/components/inkwell/cards";
import { Divider } from "@/components/inkwell/primitives";
import { type FeedFilter } from "@/components/inkwell/Header";
import { StreakWidget } from "@/components/inkwell/streak-widget";
import { DesktopSidebar } from "@/components/inkwell/feed/desktop-sidebar";
import { RecentFeed } from "@/components/inkwell/feed/recent-feed";
import { WelcomeCard } from "@/components/inkwell/feed/welcome-card";
import {
  getProfileHrefByHandle,
  getPublicProfileHref,
} from "@/lib/profiles";

function filterPieces(items: PiecePost[], filter: FeedFilter): PiecePost[] {
  if (filter === "all") return items;
  if (filter === "poems") return items.filter((item) => item.type === "poem");
  if (filter === "stories")
    return items.filter((item) => item.type === "story");
  if (filter === "essays") return items.filter((item) => item.type === "essay");
  return items;
}

export function InkwellFeed({
  pieces,
  featured,
  featuredReadHref,
}: {
  pieces: PiecePost[];
  featured: Featured;
  featuredReadHref?: string;
}) {
  const [filter, setFilter] = useState<FeedFilter>("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const visibleItems = filterPieces(pieces, filter);

  const showFirstSlot = filter === "all";

  return (
    <div className="mx-auto min-h-screen w-full max-w-[760px] pb-20 lg:max-w-6xl lg:pb-24 xl:max-w-7xl">
      <div className="px-4 min-[480px]:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-12 xl:px-10">
        <main className="min-w-0">
          {showFirstSlot && (
            <section className="lg:hidden">
              <Divider
                label={isLoggedIn ? "Your streaks" : "Welcome to inkwell"}
              />
              {isLoggedIn ? <StreakWidget /> : <WelcomeCard />}
            </section>
          )}

          {featured && (
            <section>
              <Divider label="Featured" />
              <FeaturedCard
                post={featured}
                authorHref={
                  featured.authorHandle
                    ? getProfileHrefByHandle(featured.authorHandle)
                    : getPublicProfileHref(featured.author)
                }
                readHref={featuredReadHref}
              />
            </section>
          )}

          <section>
            <Divider label="This week's prompt" accent />
            <PromptRail
              prompt={weeklyPrompt}
              authorHrefFor={(author) => getPublicProfileHref(author)}
            />
          </section>

          <section>
            <Divider label="Recent" />
            <RecentFeed items={visibleItems} showFeatures={filter === "all"} />
          </section>
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
