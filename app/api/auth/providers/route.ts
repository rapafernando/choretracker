import { NextResponse } from "next/server";
import { emailPasswordSupported, getEnabledProviders } from "@/lib/auth/providers";

export async function GET() {
  return NextResponse.json({ providers: getEnabledProviders(), emailPasswordSupported });
}
