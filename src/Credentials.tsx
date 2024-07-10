import { useEffect } from "react";
import { useUser } from "./context/UserContext";

function Credentials() {
  const { login } = useUser();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // Optionally remove the query parameters from the URL
      window.history.replaceState({}, document.title, "/");
      login(accessToken, refreshToken);
    }
  }, [login]);

  return null;
}

export default Credentials;
