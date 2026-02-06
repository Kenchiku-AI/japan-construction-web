"use client";

import { useCallback, useState } from "react";
import { useApi } from "../../../lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { invitationTokenKey } from "@/lib/constants";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        const user = await api.login({ email, password });

        const invitationToken = sessionStorage.getItem(invitationTokenKey);
        if (invitationToken) {
          await api.acceptInvitation(invitationToken);
          await api.getCurrentUser();
        }

        api.setCurrentUser(user);
        router.push("/");
      } finally {
        setLoading(false);
        sessionStorage.removeItem(invitationTokenKey);
      }
    },
    [router],
  );

  return {
    loading,
    login,
  };
};
