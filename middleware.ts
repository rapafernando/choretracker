import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/calendar", "/chores", "/settings"];

export function middleware(request: NextRequest) {
  if (!protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("choretracker_session");
  if (!sessionCookie) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/calendar/:path*", "/chores/:path*", "/settings/:path*"]
};
