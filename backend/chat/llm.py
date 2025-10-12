import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_tennis_answer(question: str, context: str, source_tag: str = "") -> str:
    
    prompt = f"""
You are RacquetSense — an AI tennis analyst.
Use the context below (live data or news) to answer the user's question clearly and conversationally.
Always keep the answer factual, concise, and end with a short source tag like {source_tag}.

Context:
{context}

User Question:
{question}
"""

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.6,
        )
        return completion.choices[0].message.content.strip()
    except Exception as e:
        return f"⚠️ Error generating answer: {e}"

