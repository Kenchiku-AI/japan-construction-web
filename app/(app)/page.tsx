"use client";

import { useAuthContext } from "@/lib/context/auth/AuthContext";

export default function Home() {
  const { currentUser } = useAuthContext();

  return <div>{JSON.stringify(currentUser)}</div>;
}
