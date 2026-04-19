import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { accessTokenKey, authRoutes } from "./lib/constants";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(accessTokenKey);

  const { pathname, searchParams } = req.nextUrl;
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except API routes, Next.js static assets, images, favicon
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
