import { useEffect, useState } from "react";
import { CurrentUser } from "../../../types";
import { useApi } from "@/lib/services/api/useApi";
import Cookies from "js-cookie";

export const useAuth = () => {
  const api = useApi();
  const [currentUser, setCurrentUser] = useState<CurrentUser>();

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (token) {
      getCurrentUser();
    }
  }, []);

  const logout = async () => {
    try {
      await api.logout();
    } finally {
      setCurrentUser(undefined);
      window.location.href = "/login";
    }
  };

  const getCurrentUser = async () => {
    try {
      const user = await api.getCurrentUser();
      setCurrentUser(user);
    } catch {}
  };

  return {
    logout,
    currentUser,
    setCurrentUser,
    getCurrentUser,
  };
};
