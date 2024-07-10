import { useEffect } from "react";
import "./App.css";
import { useUser } from "./context/UserContext";
import { Button } from "./components/button";
import { PlusIcon } from "@heroicons/react/16/solid";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "./components/dropdown";

function Navbar() {
  const { user, logout, accountSetupCompleted } = useUser();

  useEffect(() => {
    console.log("user changed:", user);
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
      <Button onClick={handleLogout}>Logout</Button>
      {accountSetupCompleted ? (
        <p>Account setup completed</p>
      ) : (
        <p>Account setup not completed</p>
      )}
      <p>User: {user?.name}</p>
      <Dropdown>
        <DropdownButton outline>
          <PlusIcon /> Options
        </DropdownButton>
        <DropdownMenu>
          <DropdownItem href="/users/1">View</DropdownItem>
          <DropdownItem href="/users/1/edit">Edit</DropdownItem>
          <DropdownItem>Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  );
}

export default Navbar;
