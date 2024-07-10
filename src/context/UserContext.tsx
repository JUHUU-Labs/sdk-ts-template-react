import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { JUHUU } from "@juhuu/sdk-ts";
import { Base64 } from "js-base64";
import { juhuu } from "../juhuuClass";
import validateAddress from "../validators/validateAddress";

const UserContext = createContext<{
  user: JUHUU.User.Object | null;
  refreshUserContext: () => Promise<JUHUU.User.Object | null>;
  logout: () => Promise<void>;
  login: (
    accessToken: string,
    refreshToken: string
  ) => Promise<JUHUU.User.Object | null>;
  accountSetupCompleted: boolean;
}>({
  user: null,
  refreshUserContext: async () => null,
  logout: async () => {},
  login: async () => null,
  accountSetupCompleted: false,
});

export function useUser() {
  return useContext(UserContext);
}

interface UserProviderProps {
  children?: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children = null }) => {
  const [user, setUser] = useState<JUHUU.User.Object | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const accountSetupCompleted: boolean = useMemo(() => {
    if (user === null) {
      return false;
    }

    if (!user.name || !user.billingEmail || !user.billingEmailVerified) {
      return false;
    }

    if (user.type === "standard") {
      return true;
    }

    if (!user.vat || !validateAddress(user.billingAddress)) {
      return false;
    }

    return true;
  }, [user]);

  const handleRefresh =
    useCallback(async (): Promise<JUHUU.User.Object | null> => {
      console.log("refreshing user context");
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        console.log("no tokens");
        return null;
      }

      const parts = accessToken.split(".");
      if (parts.length !== 3) {
        console.warn("Invalid JWT token");
        return null;
      }

      const payload = parts[1];
      const decodedPayload = Base64.decode(payload);
      const { sub: userId } = JSON.parse(decodedPayload);

      console.log("userId", userId);

      const query = await juhuu.users.retrieve({ userId }, { accessToken });

      if (!query.ok) {
        return null;
      }

      setUser(query.data.user);
      return query.data.user;
    }, []);

  useEffect(() => {
    console.log("refreshing user document");
    handleRefresh().then(() => setInitialLoading(false));
  }, [handleRefresh]);

  const handleLogout = useCallback(async (): Promise<void> => {
    console.log("logging out");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    setUser(null);
  }, []);

  const handleLogin = useCallback(
    async (
      accessToken: string,
      refreshToken: string
    ): Promise<JUHUU.User.Object | null> => {
      console.log("logging in");
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return await handleRefresh();
    },
    [handleRefresh]
  );

  useEffect(() => {
    console.log("user", JSON.stringify(user, null, 2));
    console.log("initialLoading", initialLoading);
  }, [user, initialLoading]);

  return (
    <UserContext.Provider
      value={{
        user,
        refreshUserContext: handleRefresh,
        logout: handleLogout,
        login: handleLogin,
        accountSetupCompleted,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
