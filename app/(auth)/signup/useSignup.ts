import { useApi } from "@/lib/api/ApiContext";
import { invitationTokenKey } from "@/lib/constants";
import { CurrentUser } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const useSignup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const signup = useCallback(
    async (
      first_name: string,
      last_name: string,
      email: string,
      password: string,
    ) => {
      setLoading(true);

      try {
        const user = await api.signup({
          first_name,
          last_name,
          email,
          password,
        });
        api.setCurrentUser(user);

        const invitationToken = sessionStorage.getItem(invitationTokenKey);
        if (invitationToken) {
          await api.acceptInvitation(invitationToken);

          const response = await api.getCurrentUser();
          api.setCurrentUser(response);
        }

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
    signup,
  };
};
function setCurrentUser(response: CurrentUser | undefined) {
  throw new Error("Function not implemented.");
}
