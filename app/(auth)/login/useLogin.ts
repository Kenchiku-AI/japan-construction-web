"use client";

import { useCallback, useState } from "react";
import { useApi } from "../../../lib/api/ApiContext";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        const user = await api.login({ email, password });
        api.setCurrentUser(user);
        router.push("/");
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
