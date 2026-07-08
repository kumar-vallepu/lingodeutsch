from groq import Groq
import os
import json
import re
from ai.prompts import (
    FREE_CHAT_PROMPT,
    GREETING_PROMPT,
    INTRODUCTION_PROMPT,
    LESSON_PROMPT,
    GRAMMAR_PROMPT,
    TRANSLATION_PROMPT,
)
from ai.intent import detect_intent
from dotenv import load_dotenv

from ai.memory import conversation_history
from ai.intent import detect_intent

load_dotenv()


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

PROMPT_MAP = {
    "greeting": GREETING_PROMPT,
    "introduction": INTRODUCTION_PROMPT,
    "lesson": LESSON_PROMPT,
    "grammar": GRAMMAR_PROMPT,
    "translation": TRANSLATION_PROMPT,
    "conversation": FREE_CHAT_PROMPT,
}


def generate_reply(user_input):

    conversation_history.append({
        "role": "user",
        "content": user_input
    })

    intent_data = detect_intent(user_input)

    intent = intent_data["intent"]

    topic = intent_data["topic"]

    system_prompt = PROMPT_MAP.get(
    intent,
    FREE_CHAT_PROMPT
)

    print(f"Intent: {intent}")
    print(
    "Using Prompt:",
    system_prompt[:40]
)

    messages = [
    {
        "role": "system",
        "content": system_prompt
    }
] + conversation_history

    try:

        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.0,
            max_tokens=200
        )

        reply = completion.choices[0].message.content

        print("\nRAW GROQ RESPONSE:")
        print(reply)

        try:

            match = re.search(
                r"\{.*\}",
                reply,
                re.DOTALL
            )

            if match:

                json_text = match.group(0)

                parsed_reply = json.loads(
                    json_text
                )

            else:

                raise json.JSONDecodeError(
                    "No JSON found",
                    reply,
                    0
                )

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
    
    