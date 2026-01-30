"use client";

import { useAuthContext } from "@/lib/context/auth/AuthContext";

export default function Home() {
  const { currentUser } = useAuthContext();

  console.log("CURRENT USER", currentUser);

  return <div>{JSON.stringify(currentUser)}</div>;
}
