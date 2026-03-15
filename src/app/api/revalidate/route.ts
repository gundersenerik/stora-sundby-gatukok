import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Revalidate based on document type from Sanity webhook
  const type = body?._type;
  if (type) {
    revalidateTag(type, "default");
  }

  // Always revalidate settings
  revalidateTag("siteSettings", "default");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
