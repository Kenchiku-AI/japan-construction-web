import { useEffect, useState } from "react";
import { CurrentUser } from "../../../types";
import { useApi } from "@/lib/services/api/useApi";
import Cookies from "js-cookie";

export const useAuth = () => {
  const api = useApi();
  const [currentUser, setCurrentUser] = useState<CurrentUser>();

  useEffect(() => {
    getCurrentUser();
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
      const response = await api.getCurrentUser();
      setCurrentUser(response);
    } catch {}
  };

  return {
    logout,
    currentUser,
    setCurrentUser,
    getCurrentUser,
  };
};
