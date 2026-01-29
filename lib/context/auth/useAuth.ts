import { useState } from "react";
import { CurrentUser } from "../../../types";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>();

  const logout = async () => {
    setCurrentUser(undefined);
  };

  return {
    logout,
    currentUser,
    setCurrentUser,
  };
};
