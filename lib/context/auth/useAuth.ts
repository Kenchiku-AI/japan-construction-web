// import { useCallback, useEffect, useState } from "react";
// import { accessTokenKey, refreshTokenKey } from "../../constants";
// import axios from "axios";
// import { CurrentUser } from "../../types";

export const useAuth = () => {
  return {};
  // const [accessToken, setAccessToken] = useState<string>();
  // const [refreshToken, setRefreshToken] = useState<string>();
  // const [currentUser, setCurrentUser] = useState<CurrentUser>();
  // useEffect(() => {
  //   (async () => {
  //     // const accessCreds = await Keychain.getGenericPassword({
  //     //   service: accessTokenKey,
  //     // });
  //     // if (accessCreds) setAccessToken(accessCreds.password);
  //     // const refreshCreds = await Keychain.getGenericPassword({
  //     //   service: refreshTokenKey,
  //     // });
  //     // if (refreshCreds) setRefreshToken(refreshCreds.password);
  //   })();
  // }, []);
  // const updateAccessToken = useCallback(
  //   async (token: string) => {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     await Keychain.setGenericPassword(accessTokenKey, token, {
  //       service: accessTokenKey,
  //     });
  //     setAccessToken(token);
  //   },
  //   [Keychain, setAccessToken],
  // );
  // const updateRefreshToken = useCallback(
  //   async (token: string) => {
  //     await Keychain.setGenericPassword(refreshTokenKey, token, {
  //       service: refreshTokenKey,
  //     });
  //     setRefreshToken(token);
  //   },
  //   [Keychain, setRefreshToken],
  // );
  // const logout = useCallback(async () => {
  //   delete axios.defaults.headers.common["Authorization"];
  //   await Keychain.resetGenericPassword({ service: accessTokenKey });
  //   await Keychain.resetGenericPassword({ service: refreshTokenKey });
  //   setAccessToken(undefined);
  //   setRefreshToken(undefined);
  //   setCurrentUser(undefined);
  // }, [Keychain, setAccessToken, setRefreshToken, setCurrentUser]);
  // return {
  //   accessToken,
  //   refreshToken,
  //   updateAccessToken,
  //   updateRefreshToken,
  //   logout,
  //   currentUser,
  //   setCurrentUser,
  // };
};
