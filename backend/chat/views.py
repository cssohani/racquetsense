from rest_framework.views import APIView
from rest_framework.response import Response
from dotenv import load_dotenv
import httpx, os
from rest_framework.decorators import api_view
from .rag import retrieve_context
from .llm import generate_tennis_answer
from .filters import is_tennis_related_llm

load_dotenv()

@api_view(["GET"])
def test_tennis_api(request):
    """Test your RapidAPI tennis endpoint."""
    RAPID_KEY = os.getenv("RAPIDAPI_KEY")
    RAPID_HOST = os.getenv("RAPIDAPI_HOST")

    # ⚠️ Adjust this URL once we confirm which API you’re using
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

class ChatView(APIView):
    """Main endpoint for RacquetSense chatbot."""
    def post(self, request):
        user_question = request.data.get("message", "")

        if not user_question:
            return Response({"reply": "Please ask a tennis-related question."})
        
        if not is_tennis_related_llm(user_question):
            return Response({
                "reply": (
                    "Sorry, RacquetSense only answers tennis-related questions "
                    "(technique, equipment, tournaments, or rules)."
                ),
                "rejected": True
            })

        # Get relevant info (rankings or news)
        context = retrieve_context(user_question)

        # Decide which source tag to use
        if "news" in user_question.lower() or "headline" in user_question.lower():
            source_tag = "[NewsAPI]"
        else:
            source_tag = "[Tennis Live Data API]"

        # Generate GPT answer
        reply = generate_tennis_answer(user_question, context)
        return Response({"reply": reply})


