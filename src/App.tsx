import React from "react";
import "./App.css";
import UserProvider from "./context/UserContext";
import Navbar from "./Navbar";
import Credentials from "./Credentials";

function App() {
  return (
    <UserProvider>
      <Credentials />
      <Navbar />
    </UserProvider>
  );
}

export default App;
