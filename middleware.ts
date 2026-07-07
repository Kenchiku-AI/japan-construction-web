import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { accessTokenKey, authRoutes, publicRoutes } from "./lib/constants";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(accessTokenKey);
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.some((r) => pathname.startsWith(r));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const isAuthRoute = pathname === "/" || authRoutes.some((r) => pathname.startsWith(r));

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|logo.png|hero-bg.png|(?:line-docs-screenshot|mobile-screenshot|desktop-screenshot).*\\.png).*)",
  ],
};
