import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GROQ_API_KEY")

VOICE = "de-DE-KatjaNeural"

WAKE_WORD = "hey buddy"

MAX_REPLY_CHARS = 300
