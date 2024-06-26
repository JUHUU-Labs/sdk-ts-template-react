import React from "react";
import "./App.css";
import { juhuu } from "./juhuuClass";

function App() {
  const handleFetchLocations = async () => {
    // get all locations
    const query = await juhuu.locations.list({});

    if (query.ok === true) {
      console.log(query.data);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleFetchLocations}>
          Fetch locations (check the console logs)
        </button>
        <a
          href="https://identity.juhuu.app/auth?refUrl=localhost:3000"
          target="_blank"
          rel="noreferrer"
        >
          Login or Signup using JUHUU Identity
        </a>
      </header>
    </div>
  );
}

export default App;
