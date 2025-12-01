import { NextResponse } from "next/server";
import { clearSession, getSession } from "@/lib/auth/session";

export async function GET() {
  const session = await getSession();
  return NextResponse.json({ session });
}

export async function DELETE() {
  clearSession();
  return NextResponse.json({ ok: true });
}
