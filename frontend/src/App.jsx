import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Chat from "./components/Chat";
import About from "./components/About";
import Features from "./components/Features";
import News from './components/News';
import Footer from './components/Footer';
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
          <Route path="/news" element={<News />} />
        </Routes>
      </main>

      {!isChat && <Footer />}
    </div>
  );
}
