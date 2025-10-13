import os
import httpx
from dotenv import load_dotenv

load_dotenv()


RAPID_KEY = os.getenv("RAPIDAPI_KEY")
RAPID_HOST = os.getenv("RAPIDAPI_HOST")
NEWS_KEY = os.getenv("NEWSAPI_KEY")



def get_tennis_rankings():
    
    url = "https://tennis-live-data.p.rapidapi.com/players/ATP"
    headers = {
        "x-rapidapi-key": RAPID_KEY,
        "x-rapidapi-host": RAPID_HOST
    }
    try:
        r = httpx.get(url, headers=headers, timeout=10)
        data = r.json().get("results", {}).get("rankings", [])
        top_players = data[:5]
        summary = "ATP Top 5:\n" + "\n".join([f"{p['ranking']}. {p['player_name']}" for p in top_players])
        return summary
    except Exception as e:
        return f"Error fetching tennis rankings: {e}"

def get_tennis_news():
    
    url = f"https://newsapi.org/v2/everything?q=tennis&language=en&pageSize=5&apiKey={NEWS_KEY}"
    try:
        r = httpx.get(url, timeout=10)
        articles = r.json().get("articles", [])
        headlines = [f"- {a['title']}" for a in articles[:5]]
        return "Latest Tennis News:\n" + "\n".join(headlines)
    except Exception as e:
        return f"Error fetching tennis news: {e}"



def retrieve_context(user_question: str) -> str:
    """Decide which API to call based on user question."""
    q = user_question.lower()
    
    if any(word in q for word in ["rank", "ranking", "top player", "atp", "wta"]):
        return get_tennis_rankings()
    elif any(word in q for word in ["news", "tournament", "update", "headline", "article"]):
        return get_tennis_news()
    else:
        
        return "General tennis knowledge: discuss rules, technique, coaching, or history."
