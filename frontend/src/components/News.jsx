import { useEffect, useState } from "react";
import axios from "axios";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get("/api/news/");
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="news-page px-4 py-5">
      <div className="container">
        <h1 className="display-5 fw-bold text-center mb-4 text-dark">
          Latest <span className="text-success">Tennis News</span>
        </h1>
        <p className="lead text-secondary text-center mb-5">
          Stay up to date with what’s happening in the tennis world — ATP, WTA, and more.
        </p>

        {loading && <p className="text-center text-secondary">Loading articles...</p>}

        {!loading && articles.length === 0 && (
          <p className="text-center text-secondary">No recent news found.</p>
        )}

        <div className="row g-4 justify-content-center">
          {articles.map((article, index) => (
            <div key={index} className="col-sm-6 col-lg-4">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-card-link text-decoration-none"
              >
                <div className="news-card h-100 bg-white rounded-4 shadow-sm overflow-hidden">
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="news-img"
                    />
                  ) : (
                    <div className="news-img-placeholder">No Image</div>
                  )}
                  <div className="p-3">
                    <h5 className="fw-semibold text-dark mb-2">
                      {article.title.length > 90
                        ? article.title.slice(0, 90) + "..."
                        : article.title}
                    </h5>
                    <p className="text-secondary small mb-2">
                      {new Date(article.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      • {article.source?.name || "Tennis News"}
                    </p>
                    <p className="text-secondary mb-0 small">
                      {article.description
                        ? article.description.slice(0, 100) + "..."
                        : "Read more on the source website."}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
