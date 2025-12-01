import { NextResponse } from "next/server";
import { createDemoSession, persistSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  const formData = await request.formData();
  const role = (formData.get("role") as string) ?? "parent";
  const session = createDemoSession(role as any);
  persistSession(session);
  const redirectUrl = new URL("/calendar", request.url);
  return NextResponse.redirect(redirectUrl, { status: 303 });
}
