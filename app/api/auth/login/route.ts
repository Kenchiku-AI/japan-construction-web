
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Type": "web",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(data, {
      status: response.status,
    });
  }

  const result = NextResponse.json(data);

  const clientName = process.env.NEXT_PUBLIC_CLIENT_NAME;

  if (clientName && /^[A-Za-z0-9_-]+$/.test(clientName)) {
    result.cookies.set(`${clientName}Session`, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 10,
    });
  }

  return result;
}
