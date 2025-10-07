import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "🎾 Welcome to **RacquetSense** — your personal tennis AI assistant. Ask me about players, rankings, tournaments, or coaching tips!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    try {
      const { data } = await axios.post("/api/chat/", { message: q });
      setMessages((m) => [
        ...m,
        { role: "bot", content: data.reply || "No reply." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "bot", content: "⚠️ Sorry — I couldn’t reach the backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const renderWithBadges = (text) => {
    const match = text.match(/\[(.*?)\]$/);
    let source = "";
    if (match) {
      source = match[1];
      text = text.replace(/\[(.*?)\]$/, "").trim();
    }
    return (
      <>
        <div
          dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br/>") }}
        />
        {source && <span className="badge-source">{source}</span>}
      </>
    );
  };

  return (
    <div className="app-container">
      {/* === SIDEBAR === */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-dot"></div>
          <h2 className="sidebar-title">RacquetSense</h2>
        </div>

        <nav className="sidebar-links">
          <a href="#" className="nav-link active">
            🧠 Chat
          </a>
          <a href="#" className="nav-link">
            🎾 Player Stats
          </a>
          <a href="#" className="nav-link">
            🗞️ Tennis News
          </a>
          <a href="#" className="nav-link">
            📊 Rankings
          </a>
          <a href="#" className="nav-link">
            ⚙️ Settings
          </a>
        </nav>

        <footer className="sidebar-footer">
          <p className="small">© 2025 RacquetSense</p>
        </footer>
      </aside>

      {/* === CHAT MAIN AREA === */}
      <div className="chat-container">
        <header className="chat-header">
          <span className="brand-dot"></span>
          <span>Ask RacquetSense</span>
        </header>

        <main ref={bodyRef} className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {renderWithBadges(m.content)}
            </div>
          ))}
          {loading && (
            <div className="msg bot d-flex align-items-center gap-2">
              <div className="spinner-border spinner-border-sm" />
              <span>Thinking…</span>
            </div>
          )}
        </main>

        <footer className="chat-footer">
          <div className="input-group">
            <textarea
              className="form-control"
              placeholder="Ask about tennis players, rankings, or matches..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
            />
            <button
              className="btn btn-primary"
              onClick={send}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
