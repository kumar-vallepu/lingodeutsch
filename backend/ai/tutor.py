from groq import Groq
import os
import json


from dotenv import load_dotenv

from ai.memory import conversation_history

load_dotenv()


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

SYSTEM_PROMPT = """
You are LingoDeutsch, a professional AI German tutor.

Your job:
- teach German simply
- help beginners
- keep responses short
- sound like a real tutor
- avoid long paragraphs
- be encouraging

IMPORTANT:

You MUST respond with valid JSON only.

Response format:

{
  "german": "",
  "english": "",
  "correction": "",
  "question_german": "",
  "question_english": ""
}

Rules:

- german = German response
- english = English translation
- correction = corrected sentence if user made a mistake
- question_german = follow-up question in German
- question_english = English translation of the follow-up question

Return JSON only.
Do not use markdown.
Do not use code blocks.
Do not write any text outside JSON.

Examples:

{
  "german": "Hallo!",
  "english": "Hello!",
  "correction": "",
  "question_german": "Wie heißt du?",
  "question_english": "What is your name?"
}

{
  "german": "Ich gehe zur Schule.",
  "english": "I am going to school.",
  "correction": "Ich gehe zur Schule.",
  "question_german": "",
  "question_english": ""
}
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

        try:
            parsed_reply = json.loads(reply)

        except json.JSONDecodeError:
            parsed_reply = {
                "german": reply,
                "english": "",
                "correction": "",
                "question_german": "",
                "question_english": ""
            }

        conversation_history.append({
    "role": "assistant",
    "content": json.dumps(parsed_reply)
})
        if len(conversation_history) > 10:
            conversation_history.pop(0)

        return parsed_reply

    except Exception as e:

        print("Groq Error:", e)

        return {
            "german": "Entschuldigung, ein Fehler ist aufgetreten.",
            "english": "Sorry, an error occurred.",
            "correction": "",
            "question_german": "",
            "question_english": ""
        }