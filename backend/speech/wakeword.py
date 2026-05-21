from fuzzywuzzy import fuzz

WAKE_WORDS = [
    "hey",
    "hi",
    "okay buddy"
]

def detect_wake_word(text):

    text = text.lower().strip()

    for wake in WAKE_WORDS:

        similarity = fuzz.ratio(text, wake)

        print(f"Checking '{text}' vs '{wake}' = {similarity}")

        if similarity > 88:
            return True

    return False