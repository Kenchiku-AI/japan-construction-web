"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApi } from "@/lib/api/ApiContext";
import { invitationTokenKey } from "@/lib/constants";

const AcceptInvitationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get(invitationTokenKey);
  const { currentUser, acceptInvitation } = useApi();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Invalid invitation link.");
      return;
    }

    if (currentUser === undefined) return;

    if (!currentUser) {
      // Not logged in — redirect to login, preserving token in returnTo
      router.replace(
        `/login?returnTo=${encodeURIComponent(`/accept-invitation?invitationToken=${token}`)}`,
      );
      return;
    }

    // Logged in — accept the invitation
    const accept = async () => {
      try {
        await acceptInvitation(token);
        router.replace("/");
      } catch (err: any) {
        setError(err?.response?.data?.detail || "Failed to accept invitation.");
      }
    };

    accept();
  }, [currentUser, token]);

  if (error) return <div>{error}</div>;

  return <div>招待を承認しています...</div>;
};

export default AcceptInvitationPage;
