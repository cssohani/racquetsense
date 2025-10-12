export default function About() {
  return (
    <section className="about-page d-flex flex-column align-items-center justify-content-center text-center px-4">
      <div className="about-content">
        <h1 className="display-5 fw-bold mb-3 text-dark">
          About <span className="text-success">RacquetSense</span>
        </h1>
        <p className="lead text-secondary mb-4">
          RacquetSense is your intelligent tennis companion. Designed to make
          insights about the game accessible to everyone. Powered by OpenAI and
          live tennis data, it helps players, fans, and coaches discover stats,
          strategies, and performance tips instantly.
        </p>

        <div className="about-values row mt-5 g-4 justify-content-center">
          <div className="col-md-4">
            <div className="info-card p-4 h-100 shadow-sm bg-white rounded-4">
              <h5 className="fw-semibold text-success mb-2">Our Mission</h5>
              <p className="text-secondary">
                To bring the world of tennis closer to players and fans through
                conversational AI and real-time analytics.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-card p-4 h-100 shadow-sm bg-white rounded-4">
              <h5 className="fw-semibold text-success mb-2">Our Vision</h5>
              <p className="text-secondary">
                To become the most trusted digital assistant for tennis — from
                match analysis to personalized training guidance.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-card p-4 h-100 shadow-sm bg-white rounded-4">
              <h5 className="fw-semibold text-success mb-2">Our Edge</h5>
              <p className="text-secondary">
                We combine AI-driven insight with a human-like conversational
                experience, offering clarity, precision, and engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
