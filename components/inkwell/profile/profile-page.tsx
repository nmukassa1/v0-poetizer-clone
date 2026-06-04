"use client"

import { useMemo, useState } from "react"
import { lovedPieces, type PiecePost } from "@/lib/feed"
import type { PublicProfile } from "@/lib/profile"
import { getPublicProfileByHandle } from "@/lib/profile"
import { Divider } from "@/components/inkwell/primitives"
import { StreakWidget } from "@/components/inkwell/streak-widget"
import { DEFAULT_ME_PROFILE } from "./constants"
import { ProfileHeader } from "./profile-header"
import { ProfileSidebar } from "./profile-sidebar"
import { ProfileTabContent } from "./profile-tab-content"
import { ProfileTabsNav } from "./profile-tabs-nav"
import { ProfileWriteFab } from "./profile-write-fab"
import type { ProfileMode, ProfileTabKey } from "./types"
import { lovedPieceToCard } from "./utils"

export function ProfilePage({
  initialMode = "me",
  lockMode = false,
  initialPublicHandle = "eleanorv",
  meProfile: meProfileProp,
  publicProfile: publicProfileProp,
  initialPublished = [],
  initialDrafts = [],
}: {
  initialMode?: ProfileMode
  lockMode?: boolean
  initialPublicHandle?: string
  meProfile?: PublicProfile
  publicProfile?: PublicProfile
  initialPublished?: PiecePost[]
  initialDrafts?: PiecePost[]
}) {
  const [mode] = useState<ProfileMode>(initialMode)
  const [publicHandle, setPublicHandle] = useState(initialPublicHandle)
  const [tab, setTab] = useState<ProfileTabKey>("pieces")
  const mockPublicProfile = getPublicProfileByHandle(publicHandle)

  const profile =
    mode === "me"
      ? (meProfileProp ?? DEFAULT_ME_PROFILE)
      : (publicProfileProp ?? mockPublicProfile)

  const saved = useMemo(
    () =>
      lovedPieces
        .filter((item) =>
          mode === "public" ? item.author !== profile.name : true,
        )
        .map(lovedPieceToCard),
    [mode, profile.name],
  )

  const tabs: { key: ProfileTabKey; label: string }[] =
    mode === "me"
      ? [
          { key: "pieces", label: "Pieces" },
          { key: "saved", label: "Saved" },
          { key: "drafts", label: "Drafts" },
          { key: "about", label: "About" },
        ]
      : [
          { key: "pieces", label: "Pieces" },
          { key: "saved", label: "Saved" },
          { key: "about", label: "About" },
        ]

  const activeTab = tabs.some((item) => item.key === tab) ? tab : "pieces"

  return (
    <div className="mx-auto min-h-screen w-full max-w-[760px] pb-24 lg:max-w-6xl lg:pb-28 xl:max-w-7xl">
      <div className="px-4 min-[480px]:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-12 xl:px-10">
        <main className="min-w-0">
          <ProfileHeader
            mode={mode}
            lockMode={lockMode}
            profile={profile}
            pieceCount={initialPublished.length}
            publicHandle={publicHandle}
            onPublicHandleChange={setPublicHandle}
          />

          {mode === "me" && (
            <section>
              <Divider label="Your streaks" />
              <StreakWidget />
            </section>
          )}

          <section>
            <Divider label="Library" />
            <ProfileTabsNav
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setTab}
            />
            <ProfileTabContent
              tab={activeTab}
              mode={mode}
              profile={profile}
              pieces={initialPublished}
              saved={saved}
              drafts={initialDrafts}
            />
          </section>
        </main>

        <ProfileSidebar mode={mode} />
      </div>

      {mode === "me" && <ProfileWriteFab />}
    </div>
  )
}
