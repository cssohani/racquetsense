export default function Features() {
  const features = [
    {
      title: "Live Match Insights",
      
      desc: "Ask for player stats, head-to-head records, and match summaries powered by real-time data.",
    },
    {
      title: "Technique Tips",
      
      desc: "Get expert-level breakdowns on strokes, footwork, and strategies to elevate your game.",
    },
    {
      title: "Equipment Guidance",
      
      desc: "Find out which racquets, strings, and tensions best match your playing style.",
    },
    {
      title: "Tournament Coverage",
      
      desc: "Stay informed about ATP, WTA, and ITF events, with instant bracket and ranking updates.",
    },
    {
      title: "Player Profiles",
      
      desc: "Explore in-depth stats and performance history of your favorite athletes.",
    },
    {
      title: "Personalized Training",
      
      desc: "Use AI-guided drills and analysis to improve technique, consistency, and mindset.",
    },
  ];

  return (
    <section className="features-page d-flex flex-column align-items-center justify-content-center text-center px-4 py-5">
      <h1 className="display-5 fw-bold text-dark mb-3">
        Powerful <span className="text-success">Features</span>
      </h1>
      <p className="lead text-secondary mb-5" style={{ maxWidth: "700px", margin: "0 auto" }}>
        Every feature is designed to make tennis insights smarter, faster, and more personal.
      </p>

      <div className="row justify-content-center g-4">
        {features.map((f, i) => (
          <div key={i} className="col-sm-6 col-lg-4">
            <div className="feature-card p-4 bg-white rounded-4 shadow-sm h-100">
              
              <h5 className="fw-semibold mb-2 text-success">{f.title}</h5>
              <p className="text-secondary">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
