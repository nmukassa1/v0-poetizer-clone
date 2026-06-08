import { NextResponse } from "next/server";
import { listFollowersForHandle } from "@/lib/social/follow-queries";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ handle: string }> },
) {
  const { handle } = await params;
  const profiles = await listFollowersForHandle(handle);

  if (profiles === null) {
    return NextResponse.json(
      { success: false, error: "Profile not found." },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, profiles });
}
