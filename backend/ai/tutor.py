
from groq import Groq
import os


from dotenv import load_dotenv

from ai.memory import conversation_history

load_dotenv()
print("API KEY FOUND:", bool(os.getenv("GROQ_API_KEY")))

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
9. ALWAYS separate German and English using EXACTLY this format:

Respond ONLY in this format:

GERMAN:
<German response>

ENGLISH:
<English translation>

QUESTION_GERMAN:
<German follow-up question>

QUESTION_ENGLISH:
<English follow-up question>

10. NEVER combine German and English in the same paragraph.

Response format:

GERMAN:
<German sentence>

ENGLISH:
<English translation>
11. Avoid unnecessary repetition within a single response.
12. Keep responses natural and concise.
13. Avoid repeating greetings or names.
14. Do not repeat the same German phrase multiple times in one reply.
15. If asking a follow-up question,
it MUST appear in BOTH sections.

16. Never place German text inside ENGLISH.

17. Never place English text inside GERMAN.

18. The ENGLISH section must contain only English.


If the user introduces themselves or makes casual conversation:

- respond naturally like a tutor
- continue the conversation
- do not simply translate every sentence
- ask a simple follow-up question
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
            temperature=0.1,
            max_tokens=120
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