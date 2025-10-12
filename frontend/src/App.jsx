import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./components/Landing.jsx";
import Chat from "./components/Chat.jsx";
import About from "./components/About.jsx";
import Features from "./components/Features.jsx";
import "./styles.css";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isChat = location.pathname === "/chat";

  const handleAsk = (query) => {
    navigate("/chat", { state: { initialQuery: query } });
  };

  return (
    <div className={`app-container ${isChat ? "chat-layout" : ""}`}>
      <Navbar />
      <main className={`main-view ${isChat ? "chat-active" : ""}`}>
        <Routes>
          <Route path="/" element={<Landing onSubmit={handleAsk} />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </main>
    </div>
  );
}
