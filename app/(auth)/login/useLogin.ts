import { useState } from "react";
import { useApi } from "../../../lib/services/api/useApi";
import { useAuthContext } from "../../../lib/context/auth/AuthContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuthContext();
  const api = useApi();

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const user = await api.login({ email, password });
      setCurrentUser(user);
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
  };
};
