
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Type": "web",
        Cookie: req.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    },
  );

  const data = await response.json().catch(() => null);

  const result = NextResponse.json(data ?? {}, {
    status: response.status,
  });

  const clientName = process.env.NEXT_PUBLIC_CLIENT_NAME;

  if (clientName && /^[A-Za-z0-9_-]+$/.test(clientName)) {
    result.cookies.set(`${clientName}Session`, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }

  return result;
}
