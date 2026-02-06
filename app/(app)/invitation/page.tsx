"use client";

import { useApi } from "@/lib/api/ApiContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const InvitationPage = () => {
  const api = useApi();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      (async () => {
        try {
          await api.acceptInvitation(token);
        } catch (err) {
          console.log("error", err);
        }
      })();
    }
  }, [searchParams]);

  return (
    <div>
      <span className="loading loading-spinner loading-xl"></span>Accepting
      invitation...
    </div>
  );
};

export default InvitationPage;
