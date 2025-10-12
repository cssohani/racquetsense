import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const isChat = pathname === "/chat";

  return (
    <nav className={isChat ? "navbar-vertical" : "navbar-horizontal"}>
      {/* ----- Horizontal Navbar (Landing, About, Features) ----- */}
      {!isChat && (
        <div className="d-flex align-items-center justify-content-between w-100">
          {/* Title now on the LEFT */}
          <Link to="/" className="navbar-brand-left text-decoration-none">
            RacquetSense
          </Link>

          {/* Links now on the RIGHT */}
          <div className="nav-links-horizontal">
            <Link to="/about">About</Link>
            <Link to="/features">Features</Link>
            <Link to="/chat">Chat</Link>
          </div>
        </div>
      )}

      {/* ----- Vertical Sidebar (Chat Mode) ----- */}
      {isChat && (
        <div className="d-flex flex-column w-100">
          <Link to="/" className="navbar-brand-left mb-4 text-decoration-none">
            RacquetSense
          </Link>
          <div className="nav-links-vertical">
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
