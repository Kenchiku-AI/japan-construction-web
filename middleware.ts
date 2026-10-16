import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { accessTokenKey, authRoutes, publicRoutes } from "./lib/constants";

export function middleware(req: NextRequest) {
  const clientName = process.env.NEXT_PUBLIC_CLIENT_NAME;
  const isLoggedIn = req.cookies.get("session");
  const { pathname } = req.nextUrl;

  if (clientName && !isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isPublicRoute = publicRoutes.some((r) =>
    pathname.startsWith(r),
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const isAuthRoute =
    pathname === "/" ||
    authRoutes.some((r) => pathname.startsWith(r));

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|sitemap.xml|favicon.ico|icon.svg|logo.png|apple.svg|google.svg|og-image.png|hero-bg.png|(?:line-docs-screenshot|mobile-screenshot|web-screenshot).*\\.png).*)",
  ],
};
