import { useEffect } from "react";
import "./App.css";
import { useUser } from "./context/UserContext";

function Navbar() {
  const { user, logout, accountSetupCompleted } = useUser();

  useEffect(() => {
    console.log("userrrrr", user);
  }, [user]);

  async function handleLogout() {
    console.log("logging out---");
    await logout();
  }

  return (
    <header
      style={{
        width: "100%",
        height: 200,
        backgroundColor: "red",
      }}
    >
      <a
        href="https://identity.juhuu.app/auth?refUrl=localhost:3000"
        target="_blank"
        rel="noreferrer"
      >
        Login or Signup using JUHUU Identity
      </a>
      <button onClick={handleLogout}>Logout</button>
      {accountSetupCompleted ? (
        <p>Account setup completed</p>
      ) : (
        <p>Account setup not completed</p>
      )}
      <p>User: {user?.name}</p>
    </header>
  );
}

export default Navbar;
