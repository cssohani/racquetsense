import { useState } from "react";

export default function Landing({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSubmit(query);
  };

  return (
    <div className="landing d-flex flex-column align-items-center justify-content-center text-center">
      <div className="mb-5">
        <h1 className="display-4 fw-bold text-dark">Ask <span className="text-success">RacquetSense</span></h1>
        <p className="lead text-secondary mt-3">
          Your intelligent tennis companion — ask about players, stats, tournaments, or technique.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "600px" }}>
        <div className="input-group shadow-sm">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Type your tennis question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-success px-4" type="submit">Ask</button>
        </div>
      </form>

      <img src="/assets/court-pattern.svg" alt="" className="court-bg" />
    </div>
  );
}
