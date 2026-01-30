"use client";

import { useCallback, useState } from "react";
import { useApi } from "../../../lib/services/api/useApi";
import { useAuthContext } from "../../../lib/context/auth/AuthContext";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuthContext();
  const api = useApi();

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        const user = await api.login({ email, password });
        setCurrentUser(user);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  return {
    loading,
    login,
  };
};
