export default function Footer() {
  return (
    <footer className="footer mt-auto py-4 px-4">
      <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
        {/* Brand */}
        <div className="d-flex align-items-center mb-3 mb-md-0">
          <span className="footer-logo fw-bold">RacquetSense</span>
          <span className="text-muted small ms-2">© {new Date().getFullYear()}</span>
        </div>

        {/* Links */}
        <div className="footer-links d-flex gap-4 mb-3 mb-md-0">
          <a href="/about" className="text-decoration-none text-secondary small">
            About
          </a>
          <a href="/features" className="text-decoration-none text-secondary small">
            Features
          </a>
          <a href="/news" className="text-decoration-none text-secondary small">
            News
          </a>
          <a
            href="mailto:support@racquetsense.com"
            className="text-decoration-none text-secondary small"
          >
            Contact
          </a>
        </div>

        {/* Socials */}
        <div className="d-flex gap-3">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-success social-icon"
          >
            <i className="bi bi-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-success social-icon"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-success social-icon"
          >
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
