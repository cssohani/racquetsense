import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Landing from "./components/Landing.jsx";
import Chat from "./components/Chat.jsx";
import "./styles.css";

export default function App() {
  const [mode, setMode] = useState("landing");
  const [firstQuery, setFirstQuery] = useState("");

  const handleAsk = (query) => {
    setFirstQuery(query);
    setMode("chat");
  };

  return (
    <>
      <Navbar />
      <main className="main-view">
        {mode === "landing" ? (
          <Landing onSubmit={handleAsk} />
        ) : (
          <Chat initialQuery={firstQuery} />
        )}
      </main>
    </>
  );
}
