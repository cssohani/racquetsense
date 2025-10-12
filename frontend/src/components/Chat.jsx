import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Chat() {
  const location = useLocation();
  const initialQuery = location.state?.initialQuery || "";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);
  const hasRunRef = useRef(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Handle first query from landing
  useEffect(() => {
    if (initialQuery && !hasRunRef.current) {
      hasRunRef.current = true;

      // show user’s question immediately
      setMessages([{ role: "user", content: initialQuery }]);

      // send to backend and append bot response
      send(initialQuery, { appendUser: false });
    } else if (!initialQuery && !hasRunRef.current) {
      // if no initial query, show greeting message
      hasRunRef.current = true;
      setMessages([{ role: "bot", content: "Hi! Ask me anything about tennis 🎾" }]);
    }
  }, [initialQuery]);

  const send = async (text = input, options = { appendUser: true }) => {
    const q = text.trim();
    if (!q) return;

    if (options.appendUser) {
      setMessages((m) => [...m, { role: "user", content: q }]);
    }

    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/chat/", { message: q });
      setMessages((m) => [...m, { role: "bot", content: data.reply || "..." }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", content: "Connection error." },
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

  return (
    <div className="chat-wrapper">
      <div ref={bodyRef} className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="msg bot">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-footer">
        <div className="input-group">
          <textarea
            className="form-control"
            placeholder="Ask another question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
          />
          <button
            className="btn btn-success"
            onClick={() => send()}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
