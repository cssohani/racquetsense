from openai import OpenAI

client = OpenAI()  

def is_tennis_related_llm(user_message: str) -> bool:

    system_prompt = f"""
    You are a strict classifier that decides whether a user's message is about tennis.
    The message can be about matches, players, tournaments, rules, equipment, or training.

    If the message is just a greeting (hi, hello, thanks, etc.), respond with "YES"
    because that is acceptable small talk.
    If it’s unrelated (like weather, food, politics, etc.), respond with "NO".
    Reply ONLY "YES" or "NO".
    Message: "{user_message}"
    """
    

    resp = client.chat.completions.create(
        model="gpt-4o-mini",      
        temperature=0,
        max_tokens=1,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
    )

    answer = resp.choices[0].message.content.strip().upper()
    return answer == "YES"

def is_smalltalk(message: str) -> str | None:
    
    msg = message.lower().strip()

    greetings = ["hi", "hello", "hey", "yo"]
    how_are_you = ["how are you", "how’s it going", "how are u"]
    thanks = ["thanks", "thank you", "appreciate it"]
    farewells = ["bye", "goodbye", "see you", "later"]

    if any(word in msg for word in greetings):
        return "Hey there! Ready to talk some tennis?"
    if any(phrase in msg for phrase in how_are_you):
        return "I’m doing great — been keeping up with the latest tournaments! How about you?"
    if any(word in msg for word in thanks):
        return "You’re very welcome"
    if any(word in msg for word in farewells):
        return "Catch you later! Keep your serves sharp!"
    return None

