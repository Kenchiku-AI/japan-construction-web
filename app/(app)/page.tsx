"use client";

import { useApi } from "../../lib/api/ApiContext";

export default function Home() {
  const { currentUser } = useApi();

  return (
    <div>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  );
}
