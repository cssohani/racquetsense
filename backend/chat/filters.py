from openai import OpenAI

client = OpenAI()  # relies on your OPENAI_API_KEY in .env

def is_tennis_related_llm(user_message: str) -> bool:
    """
    Uses an LLM to decide whether the user's message is about tennis.
    Returns True if tennis-related, False otherwise.
    """
    system_prompt = (
        "You are a classifier that determines whether a message is "
        "about the sport of tennis (players, equipment, techniques, "
        "tournaments, rules, scoring, training, injuries, etc.). "
        "Reply strictly with YES or NO."
    )

    resp = client.chat.completions.create(
        model="gpt-4o-mini",       # or gpt-4o if you prefer
        temperature=0,
        max_tokens=1,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
    )

    answer = resp.choices[0].message.content.strip().upper()
    return answer == "YES"
