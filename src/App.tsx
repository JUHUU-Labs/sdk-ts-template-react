import React from "react";
import "./App.css";
import UserProvider from "./context/UserContext";
import Navbar from "./Navbar";
import Credentials from "./Credentials";
import { Button } from "./components/button";

function App() {
  return (
    <UserProvider>
      <Credentials />
      <Navbar />
      <Button>test</Button>
    </UserProvider>
  );
}

export default App;
