from groq import Groq
import os

from dotenv import load_dotenv

from ai.memory import conversation_history

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

SYSTEM_PROMPT = """
You are LingoDeutsch,
a professional AI German tutor.

Your job:
- teach German simply
- help beginners
- keep responses VERY short
- sound like a real tutor
- avoid long paragraphs
- avoid markdown formatting
- avoid bullet points unless requested

Rules:
1. Maximum 2 short sentences
2. Always give:
   - German
   - English translation
3. If grammar mistake exists:
   - correct politely
4. If user asks in English:
   - translate naturally into German
5. Keep explanations beginner-friendly
6. Never generate essays
7. Never use markdown symbols like ** or ##
8. Sound encouraging and human

Response format:

GERMAN:
<German sentence>

ENGLISH:
<English translation>
"""

def generate_reply(user_input):

    conversation_history.append({
        "role": "user",
        "content": user_input
    })

    messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        }
    ] + conversation_history

    try:

        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.3,
            max_tokens=70
        )

        reply = completion.choices[0].message.content

        conversation_history.append({
            "role": "assistant",
            "content": reply
        })

        if len(conversation_history) > 10:
            conversation_history.pop(0)

        return reply

    except Exception as e:

        print("Groq Error:", e)

        return (
            "German: Entschuldigung, ein Fehler ist aufgetreten.\n"
            "English: Sorry, an error occurred."
        )