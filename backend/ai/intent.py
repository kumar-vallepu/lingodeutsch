import re


def detect_intent(user_input: str):

    text = user_input.lower().strip()

    result = {
        "intent": "conversation",
        "topic": None,
        "level": "A1"
    }

    # -----------------------------
    # Greetings
    # -----------------------------
    greetings = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good evening",
        "good afternoon",
        "hallo",
        "guten morgen",
        "guten tag"
    ]

    if any(greet == text for greet in greetings):
        result["intent"] = "greeting"
        return result

    # -----------------------------
    # Introduction
    # -----------------------------
    if re.search(r"\b(my name is|i am|i'm)\b", text):
        result["intent"] = "introduction"
        return result

    # -----------------------------
    # Lesson Topics
    # -----------------------------

    lesson_topics = {
        "greetings": [
            "greeting",
            "greetings",
            "hello",
            "hi"
        ],

        "introductions": [
            "introduction",
            "introduce",
            "introducing"
        ],

        "food": [
            "food",
            "restaurant",
            "order food",
            "menu"
        ],

        "travel": [
            "travel",
            "airport",
            "hotel",
            "train"
        ],

        "numbers": [
            "numbers",
            "counting"
        ]
    }

    if any(word in text for word in [
        "teach",
        "learn",
        "lesson",
        "practice",
        "study",
        "start"
    ]):

        result["intent"] = "lesson"

        for topic, keywords in lesson_topics.items():

            if any(keyword in text for keyword in keywords):

                result["topic"] = topic
                break

        return result

    # -----------------------------
    # Translation
    # -----------------------------

    if any(word in text for word in [
        "translate",
        "meaning",
        "what does",
        "how do you say"
    ]):

        result["intent"] = "translation"
        return result

    # -----------------------------
    # Grammar
    # -----------------------------

    if text.startswith(("ich ", "du ", "er ", "sie ", "wir ")):

        result["intent"] = "grammar"
        return result

    return result