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
      await api.login({ email, password });

      const user = await api.getCurrentUser();
      setCurrentUser(user);
    } catch (err) {}

    setLoading(false);
  };

  return {
    loading,
    login,
  };
};
