"use client";

import { useApi } from "../../lib/api/ApiContext";

export default function Home() {
  const { currentUser } = useApi();

  return <div>{JSON.stringify(currentUser)}</div>;
}
