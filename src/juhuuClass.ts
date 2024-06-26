import { Juhuu } from "@juhuu/sdk-ts";

export const juhuu = new Juhuu({
  clientVersion: "1.0.300",
  environment: "production",
  getAccessToken: async () => {
    return "token";
  },
  getRefreshToken: async () => {
    return "refreshToken";
  },
  onException: async (error) => {
    console.error(error);
    return "abort";
  },
  setAccessToken: async (accessToken) => {
    console.log(accessToken);
  },
  setRefreshToken: async (refreshToken) => {
    console.log(refreshToken);
  },
});
