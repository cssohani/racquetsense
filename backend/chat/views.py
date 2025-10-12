from rest_framework.views import APIView
from rest_framework.response import Response
from dotenv import load_dotenv
import httpx, os
from rest_framework.decorators import api_view
from .rag import retrieve_context
from .llm import generate_tennis_answer
from .filters import is_tennis_related_llm, is_smalltalk
import requests
from django.conf import settings

load_dotenv()

@api_view(["GET"])
def test_tennis_api(request):
    
    RAPID_KEY = os.getenv("RAPIDAPI_KEY")
    RAPID_HOST = os.getenv("RAPIDAPI_HOST")

    
    url = "https://tennis-live-data.p.rapidapi.com/players/ATP"

    headers = {
        "x-rapidapi-key": RAPID_KEY,
        "x-rapidapi-host": RAPID_HOST
    }

    r = httpx.get(url, headers=headers, timeout=10)
    try:
        return Response({"status": r.status_code, "data": r.json()})
    except Exception:
        return Response({"status": r.status_code, "text": r.text})

@api_view(["GET"])
def get_tennis_news(request):

    url = "https://newsapi.org/v2/everything"
    params = {
        "q": "tennis",
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 12,
        "apiKey": settings.NEWS_API_KEY,
    }

    try:
        res = requests.get(url, params=params, timeout=10)
        res.raise_for_status()
        data = res.json()
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

        

class ChatView(APIView):
    
    def post(self, request):
        user_question = request.data.get("message", "")


        if not user_question:
            return Response({"reply": "Please ask a tennis-related question."})
        
        smalltalk_reply = is_smalltalk(user_question)
        if smalltalk_reply:
            return Response({"reply": smalltalk_reply})
        
        if not is_tennis_related_llm(user_question):
            return Response({
                "reply": (
                    "Sorry, RacquetSense only answers tennis-related questions "
                    "(technique, equipment, tournaments, or rules)."
                ),
                "rejected": True
            })

        #
        context = retrieve_context(user_question)

        
        if "news" in user_question.lower() or "headline" in user_question.lower():
            source_tag = "[NewsAPI]"
        else:
            source_tag = "[Tennis Live Data API]"

        
        reply = generate_tennis_answer(user_question, context)
        return Response({"reply": reply})
    



