export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 px-4 fixed-top">
      <div className="container-fluid d-flex align-items-center">
        <img src="/assets/tennis-ball.svg" alt="logo" height="28" className="me-2" />
        <h5 className="fw-bold mb-0 text-success">RacquetSense</h5>
        <div className="ms-auto d-flex gap-3">
          <a href="#" className="text-secondary text-decoration-none">About</a>
          <a href="#" className="text-secondary text-decoration-none">Features</a>
          <a href="#" className="text-secondary text-decoration-none">Contact</a>
        </div>
      </div>
    </nav>
  );
}
